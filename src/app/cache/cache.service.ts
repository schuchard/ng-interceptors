import { Injectable, InjectionToken, Inject } from '@angular/core';
import * as storage from 'store';
import { BehaviorSubject, Observable } from 'rxjs';
import { LogService } from '../logging.service';

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
  private CACHE = new BehaviorSubject<CacheValue[]>(this.getAll());

  get cache$(): Observable<CacheValue[]> {
    return this.CACHE.asObservable();
  }
  constructor(@Inject(CACHE_STORAGE) private store: StoreJsAPI, private logService: LogService) {}

  get(key: string): any {
    return this.store.get(key);
  }

  getKeys(): string[] {
    return this.getAll().map(c => c.key);
  }

  keyExists(key: string): boolean {
    return this.getAll().some(k => k.key === key);
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
    this.logService.reset();
  }

  getAll(): CacheValue[] {
    const cache = [];
    this.store.each((val, key) => cache.push(val));
    return cache;
  }

  cacheChanged() {
    this.CACHE.next(this.getAll());
  }
}
