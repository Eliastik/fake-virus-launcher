import { Injectable } from '@angular/core';
import AppData from "src/app/model/app";
import { NativeService } from './native.service';
import { updater, app } from "@neutralinojs/lib";

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

  private isNative() {
    return (window as any)["NL_APPVERSION"] != null;
  }

  async checkUpdate() {
    this.searchingUpdate = true;

    if (!this.isNative()) {
      const data = await fetch(this.app.updateURL);
      const text = await data.text();

      this.searchingUpdate = false;
      this.newVersion = text.trim();

      if (this.app.version.localeCompare(text.trim()) < 0) {
        this.hasUpdate = true;
      }
    } else {
      const manifest = await updater.checkForUpdates(AppData.neutralinoUpdateURL);

      this.searchingUpdate = false;

      if (manifest.version != (window as any)["NL_APPVERSION"]) {
        this.hasUpdate = true;
        this.newVersion = manifest.version;
      } else {
        this.hasUpdate = false;
      }
    }
  }

  async download() {
    if (!this.isNative()) {
      this.nativeService.downloadUpdate();
    } else {
      await updater.install();
      await app.restartProcess();
    }
  }
}
