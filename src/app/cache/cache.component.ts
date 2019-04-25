import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CacheService } from './cache.service';

@Component({
  selector: 'app-cache',
  templateUrl: './cache.component.html',
  styleUrls: ['./cache.component.scss'],
})
export class CacheComponent {
  title = 'ng-interceptors';
  delay = 1000;
  cache$ = this.cache.cache$;
  response;

  constructor(private http: HttpClient, private cache: CacheService) {}

  requestCache(num: number) {
    this.http
      .get(`https://jsonplaceholder.typicode.com/todos/${num || 1}`)
      .pipe(map(res => (this.response = res)))
      .subscribe();
  }

  request() {
    this.http
      .get(`https://jsonplaceholder.typicode.com/posts/3`)
      .pipe(map(res => (this.response = res)))
      .subscribe();
  }

  clearCache() {
    this.cache.clearAll();
  }
}
