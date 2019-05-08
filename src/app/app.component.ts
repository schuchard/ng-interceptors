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

  externalLinks = [
    {
      url: 'https://github.com/schuchard/ng-interceptors',
      name: 'Github',
    },
    {
      url: 'https://www.kevinschuchard.com/blog/2019-05-08-http-interceptor',
      name: 'Article',
    },
  ];

  constructor(private breakpointObserver: BreakpointObserver, private logService: LogService) {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
      .subscribe(({ matches }) => (this.isMobile = matches));
  }

  clearLogs() {
    this.logService.reset();
  }
}
