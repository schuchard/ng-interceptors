import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CacheViewComponent } from './cache-view/cache-view.component';

const routes: Routes = [
  {
    path: 'cache',
    component: CacheViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
