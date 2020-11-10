import { Component, Input, OnInit } from '@angular/core';
import { Company } from 'src/app/models/enuns/company.enum';
import { Property } from 'src/app/models/property.model';

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.css']
})
export class ListPropertyComponent implements OnInit {

  private readonly PAGE_SIZE = 20;

  @Input() companyType: Company;
  @Input() arrayItens: Property[] = [];

  public apresentationArray = [];

  public numberOfPages = [];

  ngOnInit(): void {
    this.calculateArrayOfPages();
  }

  calculateArrayOfPages() {

    this.numberOfPages = [];
    const numberFloat = this.arrayItens.length / this.PAGE_SIZE;
    let _numberOfPages = 0

    // Convertemos o número para string:
    const str = numberFloat.toString();

    // Separamos nas duas partes.
    const splitted = str.split('.');

    // Parte inteira:
    _numberOfPages = parseInt(splitted[0]);

    // Parte decimal ('0' por padrão).
    const decimal = splitted[1] ? parseInt(splitted[1]) : 0;

    if (decimal > 0) {
      _numberOfPages++;
    }

    for (let i = 1; i <= _numberOfPages; i++) {
      this.numberOfPages.push(i);
    }
  }

  goToPage(pageNumber: number) {
    const positionInit = ((pageNumber - 1) * this.PAGE_SIZE);
    const positionFinal = (positionInit + this.PAGE_SIZE);
    this.apresentationArray = this.arrayItens.slice(positionInit, positionFinal);
  }
}
