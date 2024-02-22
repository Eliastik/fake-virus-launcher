import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingFilesDialogComponent } from './missing-files-dialog.component';

describe('MissingFilesDialogComponent', () => {
  let component: MissingFilesDialogComponent;
  let fixture: ComponentFixture<MissingFilesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissingFilesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MissingFilesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
