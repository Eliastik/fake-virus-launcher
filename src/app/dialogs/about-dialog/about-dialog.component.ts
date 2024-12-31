import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import AppData from "src/app/model/app";
import { NativeService } from 'src/app/services/native.service';

@Component({
    selector: 'app-about-dialog',
    templateUrl: './about-dialog.component.html',
    styleUrls: ['./about-dialog.component.css'],
    standalone: false
})
export class AboutDialogComponent {
  app = AppData;

  constructor(
    public dialogRef: MatDialogRef<AboutDialogComponent>,
    private translate: TranslateService,
    private nativeService: NativeService) { }

  closeDialog() {
    this.dialogRef.close();
  }

  renderDate() {
    return this.app.date.toLocaleDateString(this.translate.currentLang, { year: 'numeric', month: 'numeric', day: 'numeric' });
  }

  openWebsite() {
    this.nativeService.openWebsite();
  }

  openSourceCode() {
    this.nativeService.openSourceCode();
  }
}
