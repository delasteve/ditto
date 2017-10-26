import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';

import { Logout } from '../../core/actions/user.actions';
import { UserProfile } from '../../core/models/user-profile';
import { State, selectUserProfile } from '../../core/reducers';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent implements OnInit {
  profileImage$: Observable<string>;

  constructor(
    private store: Store<State>,
  ) { }

  ngOnInit() {
    this.profileImage$ = this.store
      .select(selectUserProfile)
      .pipe(
        filter(profile => !!profile),
        map((userProfile: UserProfile | null) => userProfile.images.length > 0 ? userProfile.images[0].url : ''),
      );
  }

  doLogout() {
    this.store.dispatch(new Logout());
  }
} /* istanbul ignore next: https://github.com/angular/angular-cli/issues/5526 */
