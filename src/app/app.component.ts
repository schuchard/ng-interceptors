import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheService } from './cache.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-interceptors';
  cache$ = this.cache.cache$;
  cacheRequest$: Observable<any>;
  request$: Observable<any>;
  constructor(private http: HttpClient, private cache: CacheService) {}

  requestCache(num: number) {
    this.cacheRequest$ = this.http.get(`https://jsonplaceholder.typicode.com/todos/${num || 1}`);
  }

  request() {
    this.request$ = this.http.get(`https://jsonplaceholder.typicode.com/posts/1`);
  }

  clearCache() {
    this.cache.clearAll();
  }
}
