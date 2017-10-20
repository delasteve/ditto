import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private oauthService: OAuthService,
  ) { }

  get loggedIn() {
    return this.oauthService.hasValidAccessToken();
  }

  doLogin() {
    this.oauthService.initImplicitFlow();
  }

  doLogout() {
    this.oauthService.logOut();
  }
}
