import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Program from 'src/app/model/program';
import { LaunchDialogErrorComponent } from '../launch-dialog-error/launch-dialog-error.component';
import { NativeService } from 'src/app/services/native.service';

@Component({
  selector: 'app-launch-dialog',
  templateUrl: './launch-dialog.component.html',
  styleUrls: ['./launch-dialog.component.css']
})
export class LaunchDialogComponent {
  program: Program | undefined;
  isFullscreen = false;

  constructor(
    public dialogRef: MatDialogRef<LaunchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { program: Program },
    private nativeService: NativeService,
    public dialog: MatDialog) {
    this.program = data.program;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  async launch() {
    try {
      await this.nativeService.launchProgram(this.program, this.isFullscreen);
    } catch (e) {
      this.dialog.open(LaunchDialogErrorComponent, {
        data: { details: e },
      });
    }

    this.closeDialog();
  }
}
