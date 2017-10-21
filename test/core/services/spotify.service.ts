import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MockSpotifyService {
  getCurrentUser = jasmine.createSpy('SpotifyService#getCurrentUser')
    .and.returnValue(of({}));
}
