import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent {
  languages: string[] = [];
  language = "fr";
  
  constructor(public dialogRef: MatDialogRef<SettingsDialogComponent>, private translate: TranslateService) {
    this.languages = [...this.translate.getLangs()];
    this.language = this.translate.currentLang;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem("lang", lang);
  }
}
