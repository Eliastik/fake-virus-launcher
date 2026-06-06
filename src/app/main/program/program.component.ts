import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LaunchDialogComponent } from '../../dialogs/launch-dialog/launch-dialog.component';
import { Program } from '../../model/program';

@Component({
    selector: 'app-program',
    templateUrl: './program.component.html',
    styleUrls: ['./program.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ProgramComponent {
  @Input() program: Program | undefined;

  constructor(public dialog: MatDialog) {}

  launch() {
    this.dialog.open(LaunchDialogComponent, {
      data: { program: this.program }
    });
  }
}
