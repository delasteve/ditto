import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { Store } from '@ngrx/store';
import { OAuthService } from 'angular-oauth2-oidc';

import { HeaderComponent } from './components/header/header.component';
import { ProfileMenuComponent } from './components/profile-menu/profile-menu.component';
import { initializeOAuth } from './initializers/oauth.init';
import { SpotifyInterceptor } from './interceptors/spotify.interceptor';
import { SpotifyService } from './services/spotify.service';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [
    HeaderComponent,
    ProfileMenuComponent,
  ],
  exports: [
    HeaderComponent,
    ProfileMenuComponent,
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        SpotifyService,
        { provide: HTTP_INTERCEPTORS, useClass: SpotifyInterceptor, multi: true },
        { provide: APP_INITIALIZER, useFactory: initializeOAuth, deps: [OAuthService, Store], multi: true },
      ],
    };
  }
}
