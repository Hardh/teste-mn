import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailPropertyComponent } from 'src/app/components/detail-property/detail-property.component';

describe('DetailPropertyComponent', () => {
  let component: DetailPropertyComponent;
  let fixture: ComponentFixture<DetailPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailPropertyComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { data: {} } }
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
