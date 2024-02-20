import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import AppData from "src/app/model/app";

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  app = AppData;
  searchingUpdate: boolean = true;
  hasUpdate: boolean = false;
  newVersion = this.app.version;

  constructor(private electronService: ElectronService) {
    this.checkUpdate();
  }

  checkUpdate() {
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

  download() {
    this.electronService.ipcRenderer.send('launch-update');
  }
}
