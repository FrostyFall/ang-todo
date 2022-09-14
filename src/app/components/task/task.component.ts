import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

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
  @Input() tableIndex!: number;
  @Input() taskIndex!: number;
  @Output() onDelete$ = new Subject<void>();

  constructor() {}

  ngOnInit(): void {}

  public onDelete(): void {
    this.onDelete$.next();
  }
}
