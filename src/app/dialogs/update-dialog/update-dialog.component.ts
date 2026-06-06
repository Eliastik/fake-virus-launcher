import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UpdateService } from '../../services/update.service';

@Component({
    selector: 'app-update-dialog',
    templateUrl: './update-dialog.component.html',
    styleUrls: ['./update-dialog.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class UpdateDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    public updateService: UpdateService) { }

  closeDialog() {
    this.dialogRef.close();
  }

  download() {
    this.updateService.download();
    this.closeDialog();
  }
}
