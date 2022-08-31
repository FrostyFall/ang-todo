import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DialogData } from '../dialog/dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  todo = ['Hold introductory meeting', 'Determine project goals'];
  doing = ['Set final deadline'];
  done = ['Contact client for project details'];

  constructor() {}

  ngOnInit(): void {}

  onAddTodoTask(data: DialogData) {
    this.todo.push(data.task);
  }

  onAddDoingTask(data: DialogData) {
    this.doing.push(data.task);
  }

  onAddDoneTask(data: DialogData) {
    this.done.push(data.task);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
