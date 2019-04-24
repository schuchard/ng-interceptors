import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: CacheService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // continue if not cachable.
    if (!this.canCache(req)) {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req.urlWithParams);
    // return HttpResponse so that HttpClient methods return a value
    return cachedResponse
      ? of(new HttpResponse({ body: cachedResponse.body }))
      : sendRequest(req, next, this.cache);
  }

  canCache(req: HttpRequest<any>): boolean {
    return req.url.includes('todos');
  }
}

/**
 * Get server response observable by sending request to `next()`.
 * Will add the response to the cache on the way out.
 */
function sendRequest(
  req: HttpRequest<any>,
  next: HttpHandler,
  cache: CacheService
): Observable<HttpEvent<any>> {
  // No headers allowed in npm search request
  const noHeaderReq = req.clone({ headers: new HttpHeaders() });

  return next.handle(noHeaderReq).pipe(
    tap(event => {
      // There may be other events besides the response.
      if (event instanceof HttpResponse) {
        cache.set(req.urlWithParams, {
          key: req.urlWithParams,
          body: event.body,
          dateAdded: Date.now(),
        });
      }
    })
  );
}
