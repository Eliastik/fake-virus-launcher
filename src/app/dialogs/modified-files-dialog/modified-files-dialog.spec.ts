import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiedFilesComponent } from './modified-files-dialog.component';

describe('MissingFilesDialogComponent', () => {
  let component: ModifiedFilesComponent;
  let fixture: ComponentFixture<ModifiedFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifiedFilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifiedFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
