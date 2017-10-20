import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { OAuthService } from 'angular-oauth2-oidc';

import { HeaderComponent } from './header.component';

export class MockOAuthService {
  initImplicitFlow = jasmine.createSpy('OAuthService.initImplicitFlow');
  logOut = jasmine.createSpy('OAuthService.logOut');
  hasValidAccessToken = jasmine.createSpy('OAuthService.hasValidAccessToken')
    .and.returnValue(false);
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockOAuthService: MockOAuthService;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          RouterTestingModule,
        ],
        providers: [
          { provide: OAuthService, useClass: MockOAuthService },
        ],
        declarations: [
          HeaderComponent,
        ],
        schemas: [
          CUSTOM_ELEMENTS_SCHEMA,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    mockOAuthService = TestBed.get(OAuthService);

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#doLogin', () => {
    it('should call OAuthService#initImplicitFlow', () => {
      component.doLogin();

      expect(mockOAuthService.initImplicitFlow).toHaveBeenCalledTimes(1);
    });
  });

  describe('#doLogout', () => {
    it('should call OAuthService#logOut', () => {
      component.doLogout();

      expect(mockOAuthService.logOut).toHaveBeenCalledTimes(1);
    });
  });

  describe('loggedIn', () => {
    it('should return false when an access token is not found', () => {
      mockOAuthService.hasValidAccessToken.and.returnValue(false);

      expect(component.loggedIn).toEqual(false);
    });

    it('should return true when an access token is found', () => {
      mockOAuthService.hasValidAccessToken.and.returnValue(true);

      expect(component.loggedIn).toEqual(true);
    });
  });

  describe('template', () => {
    it(`should display 'Login' to anonymous users`, () => {
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('button').textContent).toEqual('Login');
    });

    it(`should display 'Logout' to authenticated users`, () => {
      mockOAuthService.hasValidAccessToken.and.returnValue(true);

      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('button').textContent).toEqual('Logout');
    });
  });
});
