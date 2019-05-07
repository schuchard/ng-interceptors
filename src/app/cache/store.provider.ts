const store = require('store');
import { InjectionToken } from '@angular/core';

export const CACHE_STORAGE = new InjectionToken<StoreJsAPI>('Cache Storage', {
  providedIn: 'root',
  factory: () => store,
});
