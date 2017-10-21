import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Login } from '../../core/actions/user.actions';
import { UserProfile } from '../../core/models/user-profile';
import { State, selectUserProfile } from '../../core/reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor(
    private store: Store<State>,
  ) { }

  ngOnInit() {
    this.isLoggedIn$ = this.store
      .select(selectUserProfile)
      .pipe(map((userProfile: UserProfile | null) => !!userProfile));
  }

  doLogin() {
    this.store.dispatch(new Login());
  }
}
