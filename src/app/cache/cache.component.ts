import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CacheService } from './cache.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cache',
  templateUrl: './cache.component.html',
  styleUrls: ['./cache.component.scss'],
})
export class CacheComponent {
  destroy$ = new Subject();
  delay = 1000;
  cache$ = this.cache.cache$;
  links = [
    { url: 'https://jsonplaceholder.typicode.com/todos/1', name: 'Cache todos/1' },
    { url: 'https://jsonplaceholder.typicode.com/todos/2', name: 'Cache todos/2' },
    { url: 'https://jsonplaceholder.typicode.com/posts/3', name: 'posts/3' },
  ];
  response;

  constructor(private http: HttpClient, private cache: CacheService) {}

  request(url: string) {
    this.http
      .get(url)
      .pipe(map(res => (this.response = res)))
      .subscribe();
  }

  clearCache() {
    this.cache.clearAll();
  }

  inCache(url: string) {
    return this.cache.keyExists(url);
  }
}
