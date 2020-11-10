import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessType } from 'src/app/models/enuns/business-type.enum';
import { Property } from 'src/app/models/property.model';

@Component({
  selector: 'app-detail-property',
  templateUrl: './detail-property.component.html',
  styleUrls: ['./detail-property.component.css']
})
export class DetailPropertyComponent implements OnInit {

  property: Property;
  imageSelected: string;
  public BusinessType = BusinessType;
  
  constructor(
    public dialogRef: MatDialogRef<DetailPropertyComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.property = data.property;
  }

  ngOnInit(): void {
    const a = 0;
    if(this.property && this.property.images && this.property.images.length > 0){
      this.imageSelected = this.property.images[0];
    }
  }

  selectImage(imageSrc: string) {
    this.imageSelected = imageSrc;
  }

}
