import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { ScopesService } from '../scopes/scopes.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ScopesInterceptor implements HttpInterceptor {
  constructor(private scopes: ScopesService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.scopes.protectedRoutes(req.urlWithParams)) {
      if (this.scopes.isAdmin) {
        return next.handle(req);
      } else {
        this.router.navigate(['404']);
        return of(undefined);
      }
    }

    return next.handle(req);
  }
}
