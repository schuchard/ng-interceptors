import { Component } from '@angular/core';
import { routes } from './app-routing.module';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LogService } from './logging.service';
import { CacheService } from './cache/cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  routes = routes.slice(0, -2);
  isMobile;
  logs$ = this.logService.logs$;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private logService: LogService,
    private cache: CacheService
  ) {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait])
      .subscribe(({ matches }) => (this.isMobile = matches));
  }

  clearCacheLogs() {
    this.cache.clearAll();
  }
}
