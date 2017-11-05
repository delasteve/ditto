import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { OAuthService } from 'angular-oauth2-oidc';

import { Login, ProfileLoaded } from '../../core/actions/user.actions';
import { UserProfile } from '../../core/models/spotify/user-profile';
import { State, reducers } from '../../core/reducers';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: Store<State>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          RouterTestingModule,
          StoreModule.forRoot(reducers),
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

    store = TestBed.get(Store);
  });

  beforeEach(() => {
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('will return false when user profile is null', () => {
      fixture.detectChanges();

      component.isLoggedIn$
        .subscribe((isLoggedIn) => {
          expect(isLoggedIn).toEqual(false);
        });
    });

    it('will return true when user profile is null', () => {
      const profile: Partial<UserProfile> = { display_name: 'Test User' };
      store.dispatch(new ProfileLoaded(profile as UserProfile));

      fixture.detectChanges();

      component.isLoggedIn$
        .subscribe((isLoggedIn) => {
          expect(isLoggedIn).toEqual(true);
        });
    });
  });

  describe('#doLogin', () => {
    it('should dispatch the Login action', () => {
      const action = new Login();

      component.doLogin();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('template', () => {
    it(`should display 'Login' to anonymous users`, () => {
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('button').textContent).toEqual('Login');
    });

    it('should show profile menu component when user is logged in', () => {
      const profile: Partial<UserProfile> = { display_name: 'Test User' };
      store.dispatch(new ProfileLoaded(profile as UserProfile));

      fixture.detectChanges();

      expect(!!fixture.nativeElement.querySelector('app-profile-menu')).toEqual(true);
    });
  });
});
