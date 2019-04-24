import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScopesComponent } from './scopes/scopes.component';
import { CacheComponent } from './cache/cache.component';
import { XmlComponent } from './xml/xml.component';
import { FourOFourComponent } from './four-o-four/four-o-four.component';

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
  {
    path: '**',
    component: FourOFourComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
