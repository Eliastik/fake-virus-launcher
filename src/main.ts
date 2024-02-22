/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { init, events, app } from "@neutralinojs/lib";


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

init();

events.on("windowClose", () => {
  app.exit();
});
