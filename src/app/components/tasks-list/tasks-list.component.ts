import { Component, Input, OnInit, Output } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { DialogComponent, DialogData } from '../dialog/dialog.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {
  @Input('listTitle') title!: string;
  @Output() addTask = new Subject<DialogData>();
  @Output() clearTasks = new Subject<void>();

  ngOnInit(): void {}

  constructor(public dialog: MatDialog) {}

  onClear() {
    this.clearTasks.next();
  }

  openDialog(): void {
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
