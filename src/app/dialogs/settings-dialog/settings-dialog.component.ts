import { Component, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent {

  onThemeChanged = new EventEmitter();

  languages: string[] = [];
  language = "fr";

  themes = ["auto", "light", "dark"];
  theme = "auto";

  constructor(public dialogRef: MatDialogRef<SettingsDialogComponent>, private translate: TranslateService) {
    this.languages = [...this.translate.getLangs()];
    this.language = this.translate.currentLang;
    this.theme = localStorage.getItem("theme") || "auto";
  }

  closeDialog() {
    this.dialogRef.close();
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem("lang", lang);
  }

  changeTheme(theme: string) {
    localStorage.setItem("theme", theme);
    this.onThemeChanged.emit();
  }
}
