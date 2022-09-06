import { Component, Inject, Optional } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { createSSRSearchClient } from 'angular-instantsearch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { simple } from 'instantsearch.js/es/lib/stateMappings';
import { ssrRouter } from './ssrRouter';
import { REQUEST } from '@nguniversal/express-engine/tokens';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'server-side-rendering';
  config: any;

  constructor(
    private httpClient: HttpClient,
    private transferState: TransferState,
    @Optional()
    @Inject(REQUEST)
    protected request: Request,
  ) {
    this.config = {
      searchClient: createSSRSearchClient({
        makeStateKey,
        HttpHeaders,
        appId: 'GR3XPFYRU9',
        apiKey: 'ea24c4033fdb929f2c09709bbfc56a4b',
        transferState: this.transferState,
        httpClient: this.httpClient,
      }),
      indexName: 'library-content',
      routing: {
        router: ssrRouter(() => {
          if (this.request) {
            // request is only defined on the server side
            return this.request.url;
          }
          return window.location.pathname + window.location.search;
        }),
        stateMapping: simple(),
      },
    };
  }
}
