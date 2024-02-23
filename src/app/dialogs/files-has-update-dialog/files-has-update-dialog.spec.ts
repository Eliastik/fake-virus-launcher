import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesHasUpdateDialogComponent } from './files-has-update-dialog.component';

describe('MissingFilesDialogComponent', () => {
  let component: FilesHasUpdateDialogComponent;
  let fixture: ComponentFixture<FilesHasUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesHasUpdateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesHasUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
