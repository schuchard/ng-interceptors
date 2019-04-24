/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CachingInterceptor } from './cache.interceptor';
import { LoggingInterceptor } from './logging.interceptor';
import { XmlInterceptor } from './xml.interceptor';
import { ScopesInterceptor } from './scopes.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  /**
   * Order matters: Since interceptors pass request through in the order they're provided,
   * (requests will flow in A->B->C and responses will flow out C->B->A)
   * The LoggingInterceptor must be first so that it responds to both network and cache responses.
   */

  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ScopesInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: XmlInterceptor, multi: true },
];
