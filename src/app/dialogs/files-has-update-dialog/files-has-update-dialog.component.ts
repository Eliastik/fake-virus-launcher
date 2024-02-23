import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NativeService } from 'src/app/services/native.service';

@Component({
  selector: 'app-files-has-update-dialog',
  templateUrl: './files-has-update-dialog.component.html',
  styleUrl: './files-has-update-dialog.component.css'
})
export class FilesHasUpdateDialogComponent {

  dontShowAgain = false;

  constructor(
    public dialogRef: MatDialogRef<FilesHasUpdateDialogComponent>,
    private nativeService: NativeService) {
      this.setupDontShowAgain();
  }

  async setupDontShowAgain() {
    this.dontShowAgain = (await this.nativeService.getStorageItem("dontShowUpdatedFiles")) === "true";
  }

  closeDialog() {
    this.dialogRef.close();
  }

  downloadAssets() {
    this.nativeService.downloadAssets();
    this.closeDialog();
  }

  changeDontShowAgain() {
    this.nativeService.setStorageItem("dontShowUpdatedFiles", "" + this.dontShowAgain);
  }
}
