import * as storage from 'store';
import { InjectionToken } from '@angular/core';

export const CACHE_STORAGE = new InjectionToken<StoreJsAPI>('Cache Storage', {
  providedIn: 'root',
  factory: function store() {
    return storage;
  },
});
