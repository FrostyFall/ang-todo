import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showSpinner = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.showSpinner = false;
    }, 3000);
  }
}
