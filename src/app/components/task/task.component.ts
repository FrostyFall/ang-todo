import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input('canDrag') draggable: boolean = false;
  @Input() text: string = '';
  tags: string[] = ['High', 'Low'];

  constructor() {}
}
