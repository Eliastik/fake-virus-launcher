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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {

  @HostBinding("class") bodyClassName = "";

  app = AppData;
  title = 'fake-virus-pack';

  constructor(public dialog: MatDialog, translate: TranslateService, private overlay: OverlayContainer, public updateService: UpdateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    const storageLang = localStorage.getItem("language");

    if(storageLang) {
      translate.use(storageLang);
    } else if(browserLang) {
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    } else {
      translate.use('en');
    }
  }

  ngOnInit() {
    this.updateTheme();
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => this.updateTheme());
  }

  updateTheme() {
    const currentTheme = localStorage.getItem("theme") || "auto";
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
    window.close();
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
}
