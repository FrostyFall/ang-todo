import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  tags: string[] = ['High', 'Low'];

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {}
}
