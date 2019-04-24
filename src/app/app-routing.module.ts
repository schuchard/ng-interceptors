import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScopesComponent } from './scopes/scopes.component';
import { CacheComponent } from './cache/cache.component';
import { XmlComponent } from './xml/xml.component';

export const routes: Routes = [
  {
    path: 'cache',
    component: CacheComponent,
  },
  {
    path: 'xml',
    component: XmlComponent,
  },
  {
    path: 'scopes',
    component: ScopesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
