import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/enuns/company.enum';
import { Property } from 'src/app/models/property.model';
import { PropertyService } from 'src/app/services/property.service';
import { RulesIteratorService } from 'src/app/services/rules_iterator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public Company = Company;

  private elegibleList: Property[];

  public arrayZap: Property[];
  public arrayViva: Property[];

  public showZapResults = false;
  public showVivaResults = false;

  constructor(
    private propertyService: PropertyService,
    private rulesIteratorService: RulesIteratorService
  ) { }

  ngOnInit(): void {
    this.initializeLists()
    this.getElegibleList();
  }

  getElegibleList() {
    this.propertyService.search().subscribe(data => {
      if (Array.isArray(data)) {

        this.elegibleList = data.filter(
          item =>
            !(
              (item.address && item.address.geoLocation && item.address.geoLocation.location) &&
              (item.address.geoLocation.location.lon === 0) &&
              (item.address.geoLocation.location.lat === 0)
            )
        );

        this.mountLists();

        // TODO: Retirar
        console.log(this.elegibleList);
      }
    });
  }

  initializeLists() {
    this.arrayViva = [];
    this.arrayZap = [];
  }

  mountLists() {
    this.getZap();
    this.getViva();
  }

  getZap() {
    this.arrayZap = this.rulesIteratorService.getZapElegibleProperts(this.elegibleList);
    console.log(this.arrayZap, 'ZAP');
  }

  getViva() {
    this.arrayViva = this.rulesIteratorService.getVivaElegiblePropertis(this.elegibleList);
    console.log(this.arrayViva, 'VIVA');
  }

  showZapList() {
    this.showZapResults = true;
    this.showVivaResults = false;
  }

  showVivaList() {
    this.showVivaResults = true;
    this.showZapResults = false;
  }
}
