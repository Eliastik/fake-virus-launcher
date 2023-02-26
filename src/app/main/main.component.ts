import { Component } from '@angular/core';
import AppData from 'src/app/model/app';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  programs = AppData.programs;
}
