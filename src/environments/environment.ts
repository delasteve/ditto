import { Environment } from './environment.interface';

export const environment: Environment = {
  production: false,
  spotifyApiUrl: 'https://api.spotify.com',
  authConfig: {
    loginUrl: 'https://accounts.spotify.com/authorize',
    clientId: 'bd458c7b0dee489489ce827a1b90e10a',
    scope: 'playlist-modify-public playlist-modify-private playlist-read-private user-library-read user-library-modify',
    oidc: false,
    redirectUri: 'http://localhost:4200/',
    silentRefreshRedirectUri: 'http://localhost:4200/silent-refresh.html',
  },
};
