import { AuthConfig } from 'angular-oauth2-oidc';

export interface Environment {
  production: boolean;
  spotifyApiUrl: string;
  authConfig: AuthConfig;
}
