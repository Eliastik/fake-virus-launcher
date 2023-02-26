import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Program from 'src/app/model/program';
import { ElectronService } from 'ngx-electron';

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
    private electronService: ElectronService) {
    this.program = data.program;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  launch() {
    this.electronService.ipcRenderer.sendSync('launch', {
      program: this.program,
      isFullscreen: this.isFullscreen
    });
  }
}
