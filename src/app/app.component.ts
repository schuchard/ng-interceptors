import { Component } from '@angular/core';
import { routes } from './app-routing.module';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  routes = routes.slice(0, -2);
  constructor() {}
}
