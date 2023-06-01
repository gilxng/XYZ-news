import { Component } from '@angular/core';
import * as FullStory from '@fullstory/browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'abc-poc';
  constructor() {
    FullStory.init({ orgId: 'o-1H82NX-na1', debug: false, devMode: false });
  }
}
