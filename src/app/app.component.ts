import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'logger-application';

  constructor() {
    // setTimeout(() => {
    //   throw new Error('11111111');
    // }, 2000);
    // setTimeout(() => {
    //   throw new Error('22222222');
    // }, 4000);
    // setTimeout(() => {
    //   throw new Error('33333333');
    // }, 6000);
  }
}
