import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from './dialogs/settings-dialog/settings-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { AboutDialogComponent } from './dialogs/about-dialog/about-dialog.component';
import { UpdateDialogComponent } from './dialogs/update-dialog/update-dialog.component';
import AppData from "src/app/model/app";
import { LaunchDialogComponent } from './dialogs/launch-dialog/launch-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  app = AppData;
  title = 'fake-virus-pack';

  constructor(public dialog: MatDialog, translate: TranslateService) {
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

  closeApp() {
    window.close();
  }

  openSettings() {
    this.dialog.open(SettingsDialogComponent);
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