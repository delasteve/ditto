import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OAuthService } from 'angular-oauth2-oidc';

import { MockOAuthService } from '../../../../test/oauth.service';
import { environment } from '../../../environments/environment';
import { SpotifyService } from './spotify.service';

describe('SpotifyService', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let service: SpotifyService;
  let cachedSpotifyUrl: string;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          HttpClientTestingModule,
        ],
        providers: [
          SpotifyService,
          { provide: OAuthService, useClass: MockOAuthService },
        ],
      });
  });

  beforeEach(() => {
    service = TestBed.get(SpotifyService);
    http = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);

    cachedSpotifyUrl = environment.spotifyApiUrl;
    environment.spotifyApiUrl = 'spotify';
  });

  afterEach(() => {
    environment.spotifyApiUrl = cachedSpotifyUrl;
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getCurrentUser', () => {
    it(`should request the current user's profile`, () => {
      service.getCurrentUser()
        .subscribe();

      const req = httpMock.expectOne(`${environment.spotifyApiUrl}/v1/me`);

      expect(req.request.method).toEqual('GET');
    });
  });
});
