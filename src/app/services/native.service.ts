import { EventEmitter, Injectable, Output } from '@angular/core';
import { os, events, storage, filesystem, updater, app, window as neutralinoWindow } from "@neutralinojs/lib";
import { BlobReader, ZipReader, BlobWriter } from "@zip.js/zip.js";
import AppData from "src/app/model/app";
import { FileProgram, Program } from '../model/program';

@Injectable({
  providedIn: 'root'
})
export class NativeService {

  @Output() downloadingAssetsEvent = new EventEmitter<void>();
  @Output() finishedDownloadingAssetsEvent = new EventEmitter<void>();
  @Output() errorDownloadingAssetsEvent = new EventEmitter<void>();

  missingFiles: string[] = [];
  modifiedFiles: string[] = [];
  hasUpdateFiles = false;

  private fallbackToLocalStorage = false;

  constructor() { }

  private isNative() {
    return (window as any)["NL_CWD"] != null;
  }

  openWebsite() {
    if (this.isNative()) {
      os.open(AppData.websiteURL);
    } else {
      window.open(AppData.websiteURL);
    }
  }

  async checkUpdate() {
    const output = {
      newVersion: "",
      hasUpdate: false
    };

    if (!this.isNative()) {
      const data = await fetch(AppData.updateURL);
      const text = await data.text();

      output.newVersion = text.trim();

      if (AppData.version.localeCompare(text.trim()) < 0) {
        output.hasUpdate = true;
      }
    } else {
      const manifest = await updater.checkForUpdates(AppData.neutralinoUpdateURL);

      if (manifest.version != (window as any)["NL_APPVERSION"]) {
        output.hasUpdate = true;
        output.newVersion = manifest.version;
      } else {
        output.hasUpdate = false;
      }
    }

    return output;
  }

  async downloadUpdate() {
    if (this.isNative()) {
      try {
        await this.setStorageItem("updateFromVersion", AppData.version);
        await updater.install();
        await app.restartProcess();
      } catch (e) {
        os.open(AppData.downloadUpdateURL);
      }
    } else {
      window.open(AppData.downloadUpdateURL);
    }
  }

  async getStorageItem(name: string): Promise<string | null> {
    if (this.isNative() && !this.fallbackToLocalStorage) {
      try {
        return await storage.getData(name);
      } catch (e) {
        this.fallbackToLocalStorage = true;
        return localStorage.getItem(name);
      }
    } else {
      return localStorage.getItem(name);
    }
  }

  async setStorageItem(name: string, value: string): Promise<void> {
    if (this.isNative() && !this.fallbackToLocalStorage) {
      try {
        await storage.setData(name, value);
      } catch(e) {
        console.error("Error writing storage item: ", e);
        this.fallbackToLocalStorage = true;
        localStorage.setItem(name, value);
      }
    } else {
      localStorage.setItem(name, value);
    }
  }

  async launchProgram(program: Program | undefined, isFullscreen: boolean): Promise<void> {
    if (!program || !this.isNative()) {
      return Promise.reject();
    }

    const executablePath = "start cmd.exe /C \"" + program.file.exec + "\"" + (isFullscreen ? " /fullscreen" : "");
    const proc = await os.spawnProcess(executablePath, "./" + AppData.assetsDirectory);

    return new Promise((resolve, reject) => {
      events.on("spawnedProcess", (evt) => {
        if (proc.id == evt.detail.id) {
          switch (evt.detail.action) {
            case "stdOut":
            case "exit":
              resolve(evt.detail.data);
              break;
            case "stdErr":
              this.verifyAssetsList();
              reject(evt.detail.data);
              break;
          }
        }
      });

      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }

  minimizeWindow() {
    if (this.isNative()) {
      neutralinoWindow.minimize();
    }
  }

  private getAssetsFiles(): string[] {
    return [...AppData.programs.map(p => p.file && p.file.exec), ...AppData.additionalAssetFiles.map(p => p.exec)];
  }

  private getAssetsData(): FileProgram[] {
    return [...AppData.programs.map(p => p.file), ...AppData.additionalAssetFiles];
  }

  async verifyAssetsList(): Promise<string[]> {
    if (!this.isNative()) {
      return [];
    }

    const assetsFiles = this.getAssetsFiles();

    try {
      const directory = await filesystem.readDirectory(AppData.assetsDirectory);
      const filesInDirectory = directory.map(f => f.entry);
      const missingFiles = assetsFiles.filter(file => !filesInDirectory.includes(file));
      this.missingFiles = missingFiles;
    } catch (e: any) {
      if (e && e.code === "NE_FS_NOPATHE") {
        this.missingFiles = [...assetsFiles];
      }
    }

    return this.missingFiles;
  }

  private hex(buffer: ArrayBuffer) {
    let digest = "";
    const view = new DataView(buffer)

    for (let i = 0; i < view.byteLength; i += 4) {
      const value = view.getUint32(i)
      const stringValue = value.toString(16)
      const padding = '00000000'
      const paddedValue = (padding + stringValue).slice(-padding.length)
      digest += paddedValue
    }

    return digest;
  }

  async verifyAssetsHashs(): Promise<string[]> {
    if (!this.isNative()) {
      return [];
    }

    const assetsFiles = this.getAssetsData();

    try {
      const directory = await filesystem.readDirectory(AppData.assetsDirectory);
      const filesInDirectory = directory.map(f => f.entry);
      const modified = [];

      for (const file of filesInDirectory) {
        const assetData = assetsFiles.find(p => p.exec === file);
        const data = await filesystem.readBinaryFile(AppData.assetsDirectory + "/" + file);

        if (data && assetData) {
          const hash = this.hex(await crypto.subtle.digest("SHA-256", data));

          if (hash !== assetData.hashSHA256) {
            modified.push(file);
          }
        }
      }

      this.modifiedFiles = modified;
    } catch (e: any) {
      console.error(e);
    }

    return this.modifiedFiles;
  }

  async verifyAssetsUpdate() {
    const fromUpdate = await this.getStorageItem("updateFromVersion");

    if (fromUpdate) {
      this.hasUpdateFiles = AppData.assetsHasUpdateFrom[fromUpdate];
    } else {
      this.hasUpdateFiles = false;
    }

    return this.hasUpdateFiles;
  }

  async downloadAssets(): Promise<void> {
    this.downloadingAssetsEvent.emit();

    try {
      await filesystem.getStats(AppData.assetsDirectory);
    } catch (e: any) {
      if (e && e.code === "NE_FS_NOPATHE") {
        await filesystem.createDirectory(AppData.assetsDirectory);
      }
    }

    try {
      const archive = await fetch(AppData.assetsDownloadURL);
      const archiveBlob = await archive.blob();

      const zipFileReader = new BlobReader(archiveBlob);
      const zipReader = new ZipReader(zipFileReader);
      const entries = await zipReader.getEntries();

      for (const entry of entries) {
        if (entry && entry.getData) {
          const blobWriter = new BlobWriter();
          const data = await entry.getData(blobWriter);

          if (data) {
            await filesystem.writeBinaryFile(AppData.assetsDirectory + "/" + entry.filename, await data.arrayBuffer());
          }
        }
      }

      const result = await this.verifyAssetsList();

      if (result.length === 0) {
        await this.verifyAssetsHashs();
      }

      await this.setStorageItem("updateFromVersion", "");
      await this.verifyAssetsUpdate();

      this.finishedDownloadingAssetsEvent.emit();
    } catch (e) {
      console.error(e);
      this.errorDownloadingAssetsEvent.emit();
    }
  }
}
