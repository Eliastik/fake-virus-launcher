import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-missing-files-dialog',
  templateUrl: './missing-files-dialog.component.html',
  styleUrl: './missing-files-dialog.component.css'
})
export class MissingFilesDialogComponent {

  missingFiles: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<MissingFilesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {missingFiles: string[]}) {
    this.missingFiles = data.missingFiles;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
