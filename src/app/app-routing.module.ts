import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CacheViewComponent } from './cache-view/cache-view.component';
import { XmlViewComponent } from './xml-view/xml-view.component';

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
