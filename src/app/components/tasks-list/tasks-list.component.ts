import { Component, Input, Output } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from '../dialog/dialog.component';
import { DialogData } from 'src/app/models/dialogData.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent {
  @Input('listTitle') title!: string;
  @Output() addTask = new Subject<DialogData>();
  @Output() clearTasks = new Subject<void>();

  constructor(public dialog: MatDialog) {}

  public onClear() {
    this.clearTasks.next();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { task: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addTask.next(result);
      }
    });
  }
}
