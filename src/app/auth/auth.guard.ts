import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';
import { ConfigService } from '../utils/services/config.service';

@Injectable()
export class AuthGuard implements CanActivate {

  private publicRoutes: Array<string> = [];
  private forbiddenForAuthenticatedRouter: Array<string> = ['/login', '/register'];

  constructor(private router: Router,
              private authService: AuthService,
              private config: ConfigService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // in this case we don't care if user authenticated or not, just let the user navigate
    if (this.publicRoutes.indexOf(state.url) !== -1) {
      return true;
    }

    if (this.authService.isLoggedIn()) {

      // if user is authenticated and
      // this url is not forbidden for authenticated - let hte user navigate
      if (this.forbiddenForAuthenticatedRouter.indexOf(state.url) === -1) {
        return true;
      }

      // otherwise redirect the user back,
      // as the user is authenticated and trying to access the forbidden url
      if (this.forbiddenForAuthenticatedRouter.indexOf(state.url) !== -1) {
        this.router.navigate([this.config.getConfigParam('redirectUrl')]);
        return false;
      }
    } else {

      // not authenticated, but this url available exactly for non authenticated
      if (this.forbiddenForAuthenticatedRouter.indexOf(state.url) !== -1) {
        return true;
      }
    }

    // and in the end - this url is forbidden, please login
    this.authService.redirectUrl = state.url;
    this.router.navigate([this.config.getConfigParam('loginUrl')]);
    return false;
  }
}
