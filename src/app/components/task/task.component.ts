import { Component, Input, OnInit } from '@angular/core';

import { Tag } from '../../models/tag.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input('canDrag') draggable: boolean = false;
  @Input() title: string = '';
  @Input() tags: Tag[] = [];

  constructor() {}

  ngOnInit(): void {}
}
