import { Injectable, Injector } from '@angular/core';
import { Http, Headers, ConnectionBackend, BaseRequestOptions } from '@angular/http';
import { Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class HttpClient extends Http {

  constructor(private injector: Injector,
              private backend: ConnectionBackend,
              private defaultOptions: BaseRequestOptions,
              private router: Router) {
    super(backend, defaultOptions);
  }

  get(url, args = {headers: new Headers()}) {
    this.addAuthTokenHeader(args.headers);
    const getObservable = super.get(url, args);
    return this.doRequest(getObservable);
  }

  post(url, data, args = {headers: new Headers()}) {
    this.addAuthTokenHeader(args.headers);
    let postObservable = super.post(url, data, args);
    return this.doRequest(postObservable);
  }

  put(url, data = {}, args = {headers: new Headers()}) {
    this.addAuthTokenHeader(args.headers);
    let putObservable = super.put(url, data, args);
    return this.doRequest(putObservable);
  }

  delete(url, args = {headers: new Headers()}) {
    this.addAuthTokenHeader(args.headers);
    let deleteObservable = super.delete(url, args);
    return this.doRequest(deleteObservable);
  }

  private addAuthTokenHeader(headers: Headers) {
    if (this.authService.isLoggedIn()) {
      headers.append('Authorization', 'Bearer ' + this.authService.getAuthToken());
    }
  }

  private doRequest(requestObservable: Observable<any>) {
    return requestObservable;
  }

  private get authService(): AuthService {
    return this.injector.get(AuthService);
  }
}
