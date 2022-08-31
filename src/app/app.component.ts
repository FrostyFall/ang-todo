import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {}

  ngOnInit(): void {}
}
