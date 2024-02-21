import { Injectable } from '@angular/core';
import { os, events } from "@neutralinojs/lib";
import AppData from "src/app/model/app";
import Program from '../model/program';

@Injectable({
  providedIn: 'root'
})
export class NativeService {

  constructor() { }

  openWebsite() {
    try {
      os.open(AppData.websiteURL);
    } catch (e) {
      window.open(AppData.websiteURL);
    }
  }

  downloadUpdate() {
    try {
      os.open(AppData.downloadUpdateURL);
    } catch (e) {
      console.log("open");
      window.open(AppData.downloadUpdateURL);
    }
  }

  async launchProgram(program: Program | undefined, isFullscreen: boolean): Promise<void> {
    if (!program) {
      return Promise.reject();
    }

    const path = (window as any)["NL_CWD"] + "\\assets\\";
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
    });
  }
}
