import { Component } from '@angular/core';
import AppData from "src/app/model/app";
import { ElectronService } from 'ngx-electron';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent {
  app = AppData;
  searchingUpdate: boolean = true;
  hasUpdate: boolean = false;
  newVersion = this.app.version;

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    private electronService: ElectronService) { }

  ngOnInit() {
    fetch(this.app.updateURL).then((data) => {
      data.text().then(text => {
        this.searchingUpdate = false;
        this.newVersion = text.trim();

        if(this.app.version.localeCompare(text.trim()) < 0) {
          this.hasUpdate = true;
        }
      });
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  download() {
    this.electronService.ipcRenderer.send('launch-update');
    this.closeDialog();
  }
}