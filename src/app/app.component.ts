import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheService } from './cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-interceptors';
  cache$ = this.cache.cache$;
  constructor(private http: HttpClient, private cache: CacheService) {}

  requestCache() {
    this.http
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe(res => console.log(res));
  }

  clearCache() {
    this.cache.clearAll();
  }
}
