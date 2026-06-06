import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogsModule } from './dialogs/dialogs.module';
import { provideTranslateService, TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { MainModule } from "./main/main.module";
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { provideHttpClient, withXhr } from '@angular/common/http';

@NgModule({ declarations: [
      AppComponent
    ],
    bootstrap: [AppComponent],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatToolbarModule,
      MatButtonModule,
      RouterModule,
      MatIconModule,
      MatSidenavModule,
      MatListModule,
      MatDialogModule,
      DialogsModule,
      MainModule,
      MatBadgeModule,
      MatTooltipModule,
      TranslatePipe,
      TranslateDirective
    ],
    providers: [
      provideHttpClient(withXhr()),
      provideTranslateService({
        fallbackLang: "en",
        loader: provideTranslateHttpLoader({
          prefix:"./assets/i18n/",
          suffix: ".json"
        })
      })
    ]
  }
)
export class AppModule { }
