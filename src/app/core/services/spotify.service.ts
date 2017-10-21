import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { UserProfile } from '../models/user-profile';

@Injectable()
export class SpotifyService {

  constructor(
    private http: HttpClient,
    private oauthService: OAuthService,
  ) { }

  getCurrentUser(): Observable<UserProfile> {
    return this.http
      .get<UserProfile>(`${environment.spotifyApiUrl}/v1/me`);
  }
}
