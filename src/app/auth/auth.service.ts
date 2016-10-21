import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { ConfigService } from '../utils/services/config.service';

@Injectable()
export class AuthService {

  redirectUrl: string = '/';
  private authTokenKey: string = 'auth_token';

  constructor(private http: Http, private router: Router, private config: ConfigService) {
  }

  public login(info) {
    const body = {
      email: info.email,
      password: info.password,
      rememberMe: info.rememberMe
    };
    const headers = new Headers({'Content-Type': 'application/json'});
    const endPoint = this.config.getConfigParam('apiEndpoint') + '/auth/login';
    return this.http
      .post(endPoint, JSON.stringify(body), {headers})
      .map((response) => {
        const res = response.json();
        if (response.status === 200) {
          this.storeToken(res.token);
        }
        return res;
      });
  }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    this.router.navigate([this.config.getConfigParam('loginUrl')]);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }

  getAuthToken(): string {
    return localStorage.getItem(this.authTokenKey);
  }

  protected storeToken(token): void {
    localStorage.setItem(this.authTokenKey, token);
  }
}
