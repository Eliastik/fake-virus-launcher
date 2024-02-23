import { Injectable } from '@angular/core';
import AppData from "src/app/model/app";
import { NativeService } from './native.service';
import { updater } from "@neutralinojs/lib";

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  searchingUpdate: boolean = true;
  hasUpdate: boolean = false;
  newVersion = AppData.version;

  constructor(private nativeService: NativeService) {
    this.checkUpdate();
  }

  private isNative() {
    return (window as any)["NL_APPVERSION"] != null;
  }

  async checkUpdate() {
    this.searchingUpdate = true;

    try {
      const { hasUpdate, newVersion } = await this.nativeService.checkUpdate();

      this.hasUpdate = hasUpdate;
      this.newVersion = newVersion;
    } catch (e) {
      console.error("Error searching update", e);
    }

    this.searchingUpdate = false;
  }

  async download() {
    await this.nativeService.downloadUpdate();
  }
}
