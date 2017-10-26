import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SpotifyInterceptor implements HttpInterceptor {
  constructor(
    private oauthService: OAuthService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('api.spotify.com')) {
      const accessToken = this.oauthService.getAccessToken();
      const authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${accessToken}`) });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
} /* istanbul ignore next: https://github.com/angular/angular-cli/issues/5526 */
