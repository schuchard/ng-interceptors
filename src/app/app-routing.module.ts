import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { XmlViewComponent } from './xml-view/xml-view.component';
import { CacheViewComponent } from './cache/cache-view.component';

export const routes: Routes = [
  {
    path: 'cache',
    component: CacheViewComponent,
  },
  {
    path: 'xml',
    component: XmlViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
