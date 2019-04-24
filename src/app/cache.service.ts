import { Injectable, InjectionToken, Inject } from '@angular/core';
import * as storage from 'store';
import { HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export const CACHE_STORAGE = new InjectionToken<StoreJsAPI>('Cache Storage', {
  providedIn: 'root',
  factory: () => storage,
});

export interface CacheValue {
  key: string;
  body: any;
  dateAdded: number;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  cache$ = new BehaviorSubject<CacheValue[]>(this.getAll());
  constructor(@Inject(CACHE_STORAGE) private store: StoreJsAPI) {}

  get(key: string): any {
    return this.store.get(key);
  }

  set(key: string, value: CacheValue) {
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

  getAll(): CacheValue[] {
    const cache = [];
    this.store.each((val, key) => cache.push({ [key]: val }));
    return cache;
  }

  cacheChanged() {
    this.cache$.next(this.getAll());
  }
}
