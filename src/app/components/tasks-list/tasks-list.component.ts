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

  ngOnInit(): void {}

  constructor(public dialog: MatDialog) {}

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
