import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatIconModule, MatMenuModule } from '@angular/material';
import { Store, StoreModule } from '@ngrx/store';

import { Logout, ProfileLoaded } from '../../core/actions/user.actions';
import { UserProfile } from '../../core/models/spotify/user-profile';
import { State, reducers } from '../../core/reducers';
import { ProfileMenuComponent } from './profile-menu.component';

describe('ProfileMenuComponent', () => {
  let component: ProfileMenuComponent;
  let fixture: ComponentFixture<ProfileMenuComponent>;
  let store: Store<State>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          MatIconModule,
          MatMenuModule,
          StoreModule.forRoot(reducers),
        ],
        declarations: [
          ProfileMenuComponent,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(ProfileMenuComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should return empty string for profileImage$ when profile is null', () => {
      fixture.detectChanges();

      component.profileImage$
        .subscribe((url) => {
          expect(url).toEqual('');
        });
    });

    it('should return empty string for profileImage$ when profile has no images', () => {
      const profile: Partial<UserProfile> = { images: [] };
      store.dispatch(new ProfileLoaded(profile as UserProfile));

      fixture.detectChanges();

      component.profileImage$
        .subscribe((url) => {
          expect(url).toEqual('');
        });
    });

    it('should return the image url for profileImage$ when profile has an image', () => {
      const profile: Partial<UserProfile> = {
        images: [{ url: 'https://foo.com/image.png', height: null, width: null }],
      };
      store.dispatch(new ProfileLoaded(profile as UserProfile));

      fixture.detectChanges();

      component.profileImage$
        .subscribe((url) => {
          expect(url).toEqual(profile.images[0].url);
        });
    });
  });

  describe('#doLogout', () => {
    it('should dispatch the Logout action', () => {
      const action = new Logout();

      component.doLogout();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });
});
