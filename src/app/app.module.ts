import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NullValidationHandler, OAuthModule, OAuthService } from 'angular-oauth2-oidc';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

export function initOAuth(oauthService: OAuthService) {
  oauthService.configure(environment.authConfig);
  oauthService.tokenValidationHandler = new NullValidationHandler;

  return () => oauthService
    .tryLogin()
    .then(() => { location.hash = ''; });
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    OAuthModule.forRoot(),
    SharedModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initOAuth, deps: [OAuthService], multi: true },
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
