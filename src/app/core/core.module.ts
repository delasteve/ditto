import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import { initializeOAuth } from './initializers/oauth.init';

@NgModule({ })
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: APP_INITIALIZER, useFactory: initializeOAuth, deps: [OAuthService], multi: true },
      ],
    };
  }
}
