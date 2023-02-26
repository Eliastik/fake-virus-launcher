import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { LaunchDialogComponent } from './launch-dialog/launch-dialog.component';
import { LaunchDialogErrorComponent } from './launch-dialog-error/launch-dialog-error.component';
import { AboutDialogComponent } from './about-dialog/about-dialog.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';



@NgModule({
  declarations: [
    SettingsDialogComponent,
    LaunchDialogComponent,
    LaunchDialogErrorComponent,
    AboutDialogComponent,
    UpdateDialogComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    TranslateModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule
  ]
})
export class DialogsModule { }
