import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LogService } from '../logging.service';
import { CACHE_STORAGE } from './store.provider';

export interface CacheValue {
  key: string;
  body: any;
  dateAdded: number;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private CACHE$ = new BehaviorSubject<CacheValue[]>(this.getAll());
  prefixName = 'NG_INTERCEPTORS';

  get cache$(): Observable<CacheValue[]> {
    return this.CACHE$.asObservable();
  }
  constructor(@Inject(CACHE_STORAGE) private store: StoreJsAPI, private logService: LogService) {
    this.cacheChanged();
  }

  get(key: string): any {
    return this.store.get(this.prefix(key));
  }

  keyExists(key: string): boolean {
    return this.CACHE$.getValue().some(k => k.key === key);
  }

  set(key: string, value: CacheValue) {
    this.store.remove(this.prefix(key));
    this.store.set(this.prefix(key), { ...value, id: this.prefix(key) });
    this.cacheChanged();
  }

  remove(key: string) {
    this.store.remove(this.prefix(key));
    this.cacheChanged();
  }

  clearAll() {
    this.CACHE$.getValue().forEach(c => this.remove(c.key));
    this.cacheChanged();
    this.logService.reset();
  }

  getAll(): CacheValue[] {
    const cache = [];
    this.store.each((val, key) => cache.push(val));
    // only return items this app sets
    return cache.filter(c => c.id.startsWith(this.prefixName));
  }

  cacheChanged() {
    this.CACHE$.next(this.getAll());
  }

  prefix(key) {
    return `${this.prefixName}_${key}`;
  }
}
