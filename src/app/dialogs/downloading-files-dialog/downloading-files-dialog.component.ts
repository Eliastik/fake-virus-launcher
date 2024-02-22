import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NativeService } from 'src/app/services/native.service';

@Component({
  selector: 'app-downloading-files-dialog',
  templateUrl: './downloading-files-dialog.component.html',
  styleUrl: './downloading-files-dialog.component.css'
})
export class DownloadingFilesDialogComponent {

  hasError = false;

  constructor(
    public dialogRef: MatDialogRef<DownloadingFilesDialogComponent>,
    private nativeService: NativeService) {
    dialogRef.disableClose = true;

    this.nativeService.finishedDownloadingAssetsEvent.subscribe(() => {
      this.closeDialog();
    });

    this.nativeService.errorDownloadingAssetsEvent.subscribe(() => {
      this.hasError = true;
      dialogRef.disableClose = false;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  retry() {
    this.nativeService.downloadAssets();
    this.closeDialog();
  }
}
