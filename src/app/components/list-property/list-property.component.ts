import { Component, Input, OnInit } from '@angular/core';
import { Company } from 'src/app/models/enuns/company.enum';
import { Property } from 'src/app/models/property.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailPropertyComponent } from '../detail-property/detail-property.component';
import { BusinessType } from 'src/app/models/enuns/business-type.enum';

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
  public BusinessType = BusinessType;
  public numberOfPages = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.calculateArrayOfPages();
    this.goToPage(1);
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
    this.apresentationArray = [];
    const positionInit = ((pageNumber - 1) * this.PAGE_SIZE);
    const positionFinal = (positionInit + this.PAGE_SIZE);
    this.apresentationArray = this.arrayItens.slice(positionInit, positionFinal);
  }

  openDialog(property: Property) {
    const dialogRef = this.dialog.open(DetailPropertyComponent, {
      width: '95%',
      minHeight: '85vh',
      data: { property }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
