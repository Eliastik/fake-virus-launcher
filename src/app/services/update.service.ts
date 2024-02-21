import { Injectable } from '@angular/core';
import AppData from "src/app/model/app";
import { NativeService } from './native.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  app = AppData;
  searchingUpdate: boolean = true;
  hasUpdate: boolean = false;
  newVersion = this.app.version;

  constructor(private nativeService: NativeService) {
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
    this.nativeService.downloadUpdate();
  }
}
