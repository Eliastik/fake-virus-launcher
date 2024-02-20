import { Injectable } from '@angular/core';
import AppData from "src/app/model/app";
import { os } from "@neutralinojs/lib";

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  app = AppData;
  searchingUpdate: boolean = true;
  hasUpdate: boolean = false;
  newVersion = this.app.version;

  constructor() {
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
    os.open("https://www.eliastiksofts.com/faux-virus/downloads");
  }
}
