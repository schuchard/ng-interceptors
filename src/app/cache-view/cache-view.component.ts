import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CacheService } from '../cache.service';
import { LogService } from '../logging.service';

@Component({
  selector: 'app-cache-view',
  templateUrl: './cache-view.component.html',
  styleUrls: ['./cache-view.component.scss'],
})
export class CacheViewComponent {
  title = 'ng-interceptors';
  delay = 1000;
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
      .pipe(map(res => (this.cacheRequest$ = res)))
      .subscribe();
  }

  request() {
    this.http
      .get(`https://jsonplaceholder.typicode.com/posts/3`)
      .pipe(map(res => (this.request$ = res)))
      .subscribe();
  }

  clearCache() {
    this.cache.clearAll();
  }
}
