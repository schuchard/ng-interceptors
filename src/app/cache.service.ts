import { Injectable, InjectionToken, Inject } from '@angular/core';
import * as storage from 'store';
import { HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export const CACHE_STORAGE = new InjectionToken<StoreJsAPI>('Cache Storage', {
  providedIn: 'root',
  factory: () => storage,
});

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  cache$ = new BehaviorSubject(this.getAll());
  constructor(@Inject(CACHE_STORAGE) private store: StoreJsAPI) {}

  get(key: string): any {
    return this.store.get(key);
  }

  set(key: string, value: any) {
    this.store.remove(key);
    this.store.set(key, value);
    this.cacheChanged();
  }

  remove(key: string) {
    this.store.remove(key);
    this.cacheChanged();
  }

  clearAll() {
    this.store.clearAll();
    this.cacheChanged();
  }

  getAll() {
    const cache = [];
    this.store.each((val, key) => cache.push({ [key]: val }));
    return cache;
  }

  cacheChanged() {
    this.cache$.next(this.getAll());
  }
}
