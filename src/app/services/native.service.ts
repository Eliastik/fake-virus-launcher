import { Injectable } from '@angular/core';
import { os, events, storage, filesystem, window as neutralinoWindow } from "@neutralinojs/lib";
import AppData from "src/app/model/app";
import Program from '../model/program';

@Injectable({
  providedIn: 'root'
})
export class NativeService {

  missingFiles: string[] = [];

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

  downloadUpdate() {
    if (this.isNative()) {
      os.open(AppData.downloadUpdateURL);
    } else {
      window.open(AppData.downloadUpdateURL);
    }
  }

  async getStorageItem(name: string): Promise<string | null> {
    if (this.isNative()) {
      try {
        return await storage.getData(name);
      } catch (e) {
        return null;
      }
    } else {
      return localStorage.getItem(name);
    }
  }

  async setStorageItem(name: string, value: string): Promise<void> {
    if (this.isNative()) {
      await storage.setData(name, value);
    } else {
      localStorage.setItem(name, value);
    }
  }

  async launchProgram(program: Program | undefined, isFullscreen: boolean): Promise<void> {
    if (!program || !this.isNative()) {
      return Promise.reject();
    }

    const path = (window as any)["NL_CWD"] + "\\" + AppData.assetsDirectory + "\\";
    const executablePath = "start cmd.exe /C \"" + path + program.exec + "\"" + (isFullscreen ? " /fullscreen" : "");

    const proc = await os.spawnProcess(executablePath, path);

    return new Promise((resolve, reject) => {
      events.on("spawnedProcess", (evt) => {
        if (proc.id == evt.detail.id) {
          switch (evt.detail.action) {
            case "stdOut":
            case "exit":
              resolve(evt.detail.data);
              break;
            case "stdErr":
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

  async verifyAssetsList(): Promise<string[]> {
    if (!this.isNative()) {
      return [];
    }

    const directory = await filesystem.readDirectory(AppData.assetsDirectory);
    const filesInDirectory = directory.map(f => f.entry);
    const assetsFiles = [...AppData.programs.map(p => p.exec), ...AppData.additionalAssetFiles];
    const missingFiles = assetsFiles.filter(file => !filesInDirectory.includes(file));
    this.missingFiles = missingFiles;

    return missingFiles;
  }
}
