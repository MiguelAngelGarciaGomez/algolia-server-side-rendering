import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgAisModule } from 'angular-instantsearch';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    AppRoutingModule,
    HttpClientModule,
    NgAisModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

/*
We have an Angular application that uses the SSR mechanism. We have added Algolia as in the documentation: https://www.algolia.com/doc/guides/building-search-ui/going-further/server-side-rendering/angular/ The application renders some facets using the widget "ais-refinement-list".

When the application in opened from a slow connection, and it's run with the SSR mechanism, the first time you click on a facet, while the page is still loading, the URL does not change (is not adding the search term params) and when is fully loaded, the element is unselected, going to the original state.

But if the application in run without the SSR mechanism (only with "ng serve"), and with the slow connection, when a facet is clicked, the URL is changed, and when the page is fully loaded, the element keeps selected.
 */
