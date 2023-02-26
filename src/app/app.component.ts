import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from './dialogs/settings-dialog/settings-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
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
    const dialogRef = this.dialog.open(SettingsDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
