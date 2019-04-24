import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { httpInterceptorProviders } from './interceptors';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ScopesComponent } from './scopes/scopes.component';
import { CacheComponent } from './cache/cache.component';
import { XmlComponent } from './xml/xml.component';
import { FourOFourComponent } from './four-o-four/four-o-four.component';

@NgModule({
  declarations: [
    AppComponent,
    CacheComponent,
    XmlComponent,
    ScopesComponent,
    ScopesComponent,
    FourOFourComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
