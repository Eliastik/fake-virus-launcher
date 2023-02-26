import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Program from 'src/app/model/program';
import { ElectronService } from 'ngx-electron';
import { LaunchDialogErrorComponent } from '../launch-dialog-error/launch-dialog-error.component';

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
    @Inject(MAT_DIALOG_DATA) public data: {program: Program},
    private electronService: ElectronService,
    public dialog: MatDialog) {
    this.program = data.program;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  launch() {
    const result = this.electronService.ipcRenderer.sendSync('launch', {
      program: this.program,
      isFullscreen: this.isFullscreen
    });

    if(result.code == "error") {
      this.dialog.open(LaunchDialogErrorComponent, {
        data: { details: result.data },
      });
    }

    this.closeDialog();
  }
}