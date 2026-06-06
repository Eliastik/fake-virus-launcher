import { Component, ChangeDetectionStrategy } from '@angular/core';
import AppData from '../model/app';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class MainComponent {

  cols = 2;
  programs = AppData.programs.filter(program => !program.isEasterEgg);

  ngOnInit() {
    this.cols = (window.innerWidth <= 580) ? 1 : 2;
  }

  onResize(event: any) {
    this.cols = (event.target.innerWidth <= 580) ? 1 : 2;
  }

}
