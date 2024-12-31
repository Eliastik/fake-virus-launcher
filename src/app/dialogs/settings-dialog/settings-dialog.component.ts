import { Component, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { NativeService } from 'src/app/services/native.service';

@Component({
    selector: 'app-settings-dialog',
    templateUrl: './settings-dialog.component.html',
    styleUrls: ['./settings-dialog.component.css'],
    standalone: false
})
export class SettingsDialogComponent {

  onThemeChanged = new EventEmitter();

  languages: string[] = [];
  language = "fr";

  themes = ["auto", "light", "dark"];
  theme = "auto";

  constructor(
    public dialogRef: MatDialogRef<SettingsDialogComponent>,
    private translate: TranslateService,
    private nativeService: NativeService) {
    this.languages = [...this.translate.getLangs()];
    this.language = this.translate.currentLang;
  }

  ngOnInit() {
    this.initializeTheme();
  }

  private async initializeTheme() {
    this.theme = await this.nativeService.getStorageItem("theme") || "auto";
  }

  closeDialog() {
    this.dialogRef.close();
  }

  async changeLanguage(lang: string) {
    this.translate.use(lang);
    await this.nativeService.setStorageItem("lang", lang);
  }

  async changeTheme(theme: string) {
    await this.nativeService.setStorageItem("theme", theme);
    this.onThemeChanged.emit();
  }
}
