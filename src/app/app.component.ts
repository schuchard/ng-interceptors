import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheService } from './cache.service';
import { map, tap } from 'rxjs/operators';
import { LogService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-interceptors';
  delay = 2000;
  cache$ = this.cache.cache$;
  logs$ = this.logService.logs$;
  cacheRequest$;
  request$;

  constructor(
    private http: HttpClient,
    private cache: CacheService,
    private logService: LogService
  ) {}

  requestCache(num: number) {
    this.http
      .get(`https://jsonplaceholder.typicode.com/todos/${num || 1}`)
      .pipe(
        map(res => (this.cacheRequest$ = res)),
        tap(() => setTimeout(() => (this.cacheRequest$ = undefined), this.delay))
      )
      .subscribe();
  }

  request() {
    this.http
      .get(`https://jsonplaceholder.typicode.com/posts/3`)
      .pipe(
        map(res => (this.request$ = res)),
        tap(() => setTimeout(() => (this.request$ = undefined), this.delay))
      )
      .subscribe();
  }

  clearCache() {
    this.cache.clearAll();
  }
}
