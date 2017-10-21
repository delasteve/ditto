import { Injectable } from '@angular/core';

@Injectable()
export class MockOAuthService {
  initImplicitFlow = jasmine.createSpy('OAuthService.initImplicitFlow');
  logOut = jasmine.createSpy('OAuthService.logOut');
  hasValidAccessToken = jasmine.createSpy('OAuthService.hasValidAccessToken')
    .and.returnValue(false);
  getAccessToken = jasmine.createSpy('OAuthService.getAccessToken')
    .and.returnValue('');
}
