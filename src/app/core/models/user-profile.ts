import { Followers } from './followers';
import { Image } from './image';
import { SpotifyExternalUrl } from './spotify-external-url';

export interface UserProfile {
  display_name: string;
  external_urls: SpotifyExternalUrl;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  type: string;
  uri: string;
}
