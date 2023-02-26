import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramComponent } from './program/program.component';
import { MainComponent } from './main.component';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ProgramComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class MainModule { }
