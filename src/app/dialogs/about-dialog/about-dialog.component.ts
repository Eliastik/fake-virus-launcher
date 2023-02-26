import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ElectronService } from 'ngx-electron';
import AppData from "src/app/model/app";

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.css']
})
export class AboutDialogComponent {
  app = AppData;

  constructor(
    public dialogRef: MatDialogRef<AboutDialogComponent>,
    private translate: TranslateService,
    private electronService: ElectronService) { }

  closeDialog() {
    this.dialogRef.close();
  }

  renderDate() {
    return this.app.date.toLocaleDateString(this.translate.currentLang, { year: 'numeric', month: 'numeric', day: 'numeric' });
  }

  openWebsite() {
    this.electronService.ipcRenderer.send('launch-website');
  }
}
