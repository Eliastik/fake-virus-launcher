import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-launch-dialog-error',
    templateUrl: './launch-dialog-error.component.html',
    styleUrls: ['./launch-dialog-error.component.css'],
    standalone: false
})
export class LaunchDialogErrorComponent {
  @Input() details: string;
  
  constructor(
    public dialogRef: MatDialogRef<LaunchDialogErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {details: string}) {
    this.details = data.details;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
