import { Component, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from './dialogs/settings-dialog/settings-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { AboutDialogComponent } from './dialogs/about-dialog/about-dialog.component';
import { UpdateDialogComponent } from './dialogs/update-dialog/update-dialog.component';
import AppData from "src/app/model/app";
import { LaunchDialogComponent } from './dialogs/launch-dialog/launch-dialog.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { UpdateService } from './services/update.service';
import { app } from "@neutralinojs/lib";
import { NativeService } from './services/native.service';
import { MissingFilesDialogComponent } from './dialogs/missing-files-dialog/missing-files-dialog.component';
import { DownloadingFilesDialogComponent } from './dialogs/downloading-files-dialog/downloading-files-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {

  @HostBinding("class") bodyClassName = "";

  app = AppData;
  title = 'fake-virus-pack';

  constructor(
    public dialog: MatDialog,
    private translate: TranslateService,
    private overlay: OverlayContainer,
    public updateService: UpdateService,
    public nativeService: NativeService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    this.nativeService.downloadingAssetsEvent.subscribe(() => {
      this.dialog.open(DownloadingFilesDialogComponent);
    });
  }

  ngOnInit() {
    this.initializeLangs();
    this.updateTheme();
    this.checkFiles();
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => this.updateTheme());
    document.addEventListener("contextmenu", event => event.preventDefault());
  }

  async initializeLangs() {
    const browserLang = this.translate.getBrowserLang();
    const storageLang = await this.nativeService.getStorageItem("lang");

    if(storageLang) {
      this.translate.use(storageLang);
    } else if(browserLang) {
      this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    } else {
      this.translate.use('en');
    }
  }

  async checkFiles() {
    const missingFiles = await this.nativeService.verifyAssetsList();

    if (missingFiles.length > 0) {
      this.dialog.open(MissingFilesDialogComponent, {
        data: { missingFiles }
      });
    } else {
      //const modifiedFiles = await this.nativeService.verifyModifiedAssets();
    }
  }

  async updateTheme() {
    const currentTheme = await this.nativeService.getStorageItem("theme") || "auto";
    const currenThemePreference = currentTheme === "auto" ? this.getUserThemePreference() : currentTheme;

    if (currenThemePreference === "dark") {
      this.bodyClassName = "darkMode";
      this.overlay.getContainerElement().classList.add("darkMode");
    } else {
      this.bodyClassName = "";
      this.overlay.getContainerElement().classList.remove("darkMode");
    }
  }

  private getUserThemePreference(): string {
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  }

  closeApp() {
    app.exit();
  }

  openSettings() {
    const dialogRef = this.dialog.open(SettingsDialogComponent);
    dialogRef.componentInstance.onThemeChanged.subscribe(() => this.updateTheme());
  }

  openAbout() {
    this.dialog.open(AboutDialogComponent);
  }

  checkUpdate() {
    this.dialog.open(UpdateDialogComponent);
  }

  launchEgg() {
    this.dialog.open(LaunchDialogComponent, {
      data: { program: this.app.programs.find(p => p.name === "egg") }
    });
  }

  showMissingFiles() {
    this.dialog.open(MissingFilesDialogComponent, {
      data: { missingFiles: this.nativeService.missingFiles }
    });
  }
}
