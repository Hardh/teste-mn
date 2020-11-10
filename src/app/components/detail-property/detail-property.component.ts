import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Property } from 'src/app/models/property.model';

@Component({
  selector: 'app-detail-property',
  templateUrl: './detail-property.component.html',
  styleUrls: ['./detail-property.component.css']
})
export class DetailPropertyComponent implements OnInit {

  property: Property;
  imageSelected: string;

  constructor(
    public dialogRef: MatDialogRef<DetailPropertyComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.property = data.property;
  }

  ngOnInit(): void {
    const a = 0;
  }

  selectImage(imageSrc: string) {
    this.imageSelected = imageSrc;
  }

}
