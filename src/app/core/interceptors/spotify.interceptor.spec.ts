import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { OAuthService } from 'angular-oauth2-oidc';

import { MockOAuthService } from '../../../../test/oauth.service';
import { SpotifyInterceptor } from './spotify.interceptor';

describe('SpotifyInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let oauthService: MockOAuthService;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          HttpClientTestingModule,
        ],
        providers: [
          SpotifyInterceptor,
          { provide: OAuthService, useClass: MockOAuthService },
          { provide: HTTP_INTERCEPTORS, useClass: SpotifyInterceptor, multi: true },
        ],
      });
  });

  beforeEach(() => {
    http = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    oauthService = TestBed.get(OAuthService);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    const interceptor = TestBed.get(SpotifyInterceptor);

    expect(interceptor).toBeTruthy();
  });

  describe('#intercept', () => {
    beforeEach(() => {
      oauthService.getAccessToken
        .and
        .returnValue('bar');
    });

    describe('should add an Authorization header when requesting a spotify resource', () => {
      const SPOTIFY_URL = 'https://api.spotify.com';

      it('GET', () => {
        http
          .get(SPOTIFY_URL)
          .subscribe();

        const req = httpMock.expectOne(SPOTIFY_URL);

        expect(req.request.headers.has('Authorization')).toEqual(true);
        expect(req.request.headers.get('Authorization')).toEqual('Bearer bar');
      });

      it('POST', () => {
        http
          .post(SPOTIFY_URL, {})
          .subscribe();

        const req = httpMock.expectOne(SPOTIFY_URL);

        expect(req.request.headers.has('Authorization')).toEqual(true);
        expect(req.request.headers.get('Authorization')).toEqual('Bearer bar');
      });

      it('PUT', () => {
        http
          .put(SPOTIFY_URL, {})
          .subscribe();

        const req = httpMock.expectOne(SPOTIFY_URL);

        expect(req.request.headers.has('Authorization')).toEqual(true);
        expect(req.request.headers.get('Authorization')).toEqual('Bearer bar');
      });

      it('DELETE', () => {
        http
          .delete(SPOTIFY_URL)
          .subscribe();

        const req = httpMock.expectOne(SPOTIFY_URL);

        expect(req.request.headers.has('Authorization')).toEqual(true);
        expect(req.request.headers.get('Authorization')).toEqual('Bearer bar');
      });
    });

    describe('should not add an Authorization header when resource is not from spotify', () => {
      beforeEach(() => {
        oauthService.getAccessToken
          .and
          .returnValue('bar');
      });

      const OTHER_URL = 'https://api.notspotify.com';

      it('GET', () => {
        http
          .get(OTHER_URL)
          .subscribe();

        const req = httpMock.expectOne(OTHER_URL);

        expect(req.request.headers.has('Authorization')).toEqual(false);
      });

      it('POST', () => {
        http
          .post(OTHER_URL, {})
          .subscribe();

        const req = httpMock.expectOne(OTHER_URL);

        expect(req.request.headers.has('Authorization')).toEqual(false);
      });

      it('PUT', () => {
        http
          .put(OTHER_URL, {})
          .subscribe();

        const req = httpMock.expectOne(OTHER_URL);

        expect(req.request.headers.has('Authorization')).toEqual(false);
      });

      it('DELETE', () => {
        http
          .delete(OTHER_URL)
          .subscribe();

        const req = httpMock.expectOne(OTHER_URL);

        expect(req.request.headers.has('Authorization')).toEqual(false);
      });
    });
  });
});
