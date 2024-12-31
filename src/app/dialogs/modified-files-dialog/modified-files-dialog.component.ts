import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NativeService } from 'src/app/services/native.service';

@Component({
    selector: 'app-modified-files-dialog',
    templateUrl: './modified-files-dialog.component.html',
    styleUrl: './modified-files-dialog.component.css',
    standalone: false
})
export class ModifiedFilesComponent {

  modifiedFiles: string[] = [];
  dontShowAgain = false;

  constructor(
    public dialogRef: MatDialogRef<ModifiedFilesComponent>,
    private nativeService: NativeService,
    @Inject(MAT_DIALOG_DATA) public data: {modifiedFiles: string[]}) {
    this.modifiedFiles = data.modifiedFiles;
    this.setupDontShowAgain();
  }

  async setupDontShowAgain() {
    this.dontShowAgain = (await this.nativeService.getStorageItem("dontShowModifiedFiles")) === "true";
  }

  closeDialog() {
    this.dialogRef.close();
  }

  downloadAssets() {
    this.nativeService.downloadAssets();
    this.closeDialog();
  }

  changeDontShowAgain() {
    this.nativeService.setStorageItem("dontShowModifiedFiles", "" + this.dontShowAgain);
  }
}
