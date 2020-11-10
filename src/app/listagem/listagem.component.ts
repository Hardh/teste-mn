import { Component, OnInit } from '@angular/core';
import { Property } from '../models/property.model';
import { ListService } from '../services/listagem.service';
import { RulesIteratorService } from '../services/rules_iterator';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  private elegibleList: Property[];

  public arrayZap: Property[];
  public arrayViva: Property[];
  public showZapResults: boolean = false;
  public showVivaResults: boolean = false;

  constructor(
    private listService: ListService,
    private rulesIteratorService: RulesIteratorService
  ) { }

  ngOnInit(): void {
    this.arrayViva = [];
    this.arrayZap = [];
    this.getElegibleList();
  }

  getElegibleList() {
    this.listService.search().subscribe(data => {
      if (Array.isArray(data)) {

        this.elegibleList = data.filter(
          item => {
            const a = !((item.address && item.address.geoLocation && item.address.geoLocation.location) &&
            (item.address.geoLocation.location.lon === 0) &&
            (item.address.geoLocation.location.lat === 0))

            console.log(a);
            return a;
          }
        );

        // TODO: Retirar
        console.log(this.elegibleList);
      }
    });
  }

  getZap() {
    this.arrayZap = this.rulesIteratorService.getZapElegibleProperts(this.elegibleList);
    console.log(this.arrayZap, 'ZAP');
    this.showZapResults = true;
  }

  getViva() {
    this.arrayViva = this.rulesIteratorService.getVivaElegiblePropertis(this.elegibleList);
    console.log(this.arrayViva, 'VIVA');
    this.showVivaResults = true;
  }
}
