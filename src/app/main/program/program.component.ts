import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LaunchDialogComponent } from 'src/app/dialogs/launch-dialog/launch-dialog.component';
import Program from 'src/app/model/program';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
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