import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DownloadingFilesDialogComponent } from './downloading-files-dialog.component';

describe('DownloadingFilesDialogComponent', () => {
  let component: DownloadingFilesDialogComponent;
  let fixture: ComponentFixture<DownloadingFilesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadingFilesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadingFilesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
