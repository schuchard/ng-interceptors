import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { ScopesService } from '../scopes/scopes.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ScopesInterceptor implements HttpInterceptor {
  constructor(private scopesService: ScopesService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // not protected, pass request through
    if (!this.scopesService.protectedRoutes(req.urlWithParams)) {
      return next.handle(req);
    }

    // route is protected, only allow admins
    if (this.scopesService.isAdmin) {
      return next.handle(req);
    } else {
      // not admin, redirect and cancel request
      this.router.navigate(['404']);
      return of(undefined);
    }
  }
}
