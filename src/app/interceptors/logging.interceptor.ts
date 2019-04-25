import { finalize, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { LogService } from '../logging.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private log: LogService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let status: string;

    // extend server response observable with logging
    return next.handle(req).pipe(
      tap(
        // Succeeds when there is a response; ignore other events
        event => (status = event instanceof HttpResponse ? 'success' : 'fail'),
        // Operation failed; error is an HttpErrorResponse
        error => (status = 'failed')
      ),
      // Log when response observable either completes or errors
      finalize(() => {
        const elapsed = Date.now() - started;
        const url = req.urlWithParams.replace(new RegExp('^//|^.*?:(//)?', 'gi'), '');
        this.log.add({ url, status, elapsed, fullUrl: req.urlWithParams });
      })
    );
  }
}
