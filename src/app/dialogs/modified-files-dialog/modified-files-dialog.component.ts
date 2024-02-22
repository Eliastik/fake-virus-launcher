import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NativeService } from 'src/app/services/native.service';

@Component({
  selector: 'app-modified-files-dialog',
  templateUrl: './modified-files-dialog.component.html',
  styleUrl: './modified-files-dialog.component.css'
})
export class ModifiedFilesComponent {

  modifiedFiles: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModifiedFilesComponent>,
    private nativeService: NativeService,
    @Inject(MAT_DIALOG_DATA) public data: {modifiedFiles: string[]}) {
    this.modifiedFiles = data.modifiedFiles;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  downloadAssets() {
    this.nativeService.downloadAssets();
    this.closeDialog();
  }
}
