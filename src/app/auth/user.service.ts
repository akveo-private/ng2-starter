import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';

import { ConfigService } from '../utils/services/config.service';

@Injectable()
export class UserService {

  private userInfo: any;

  constructor(private http: Http, private config: ConfigService) {
  }

  getLoggedInUser(reload: boolean = false): Observable<any> {
    if (this.userInfo && !reload) {
      return Observable.of(this.userInfo);
    } else {
      const endPoint = this.config.getConfigParam('apiEndpoint') + '/users/load';
      return this.http.get(endPoint)
        .map(res => {
          this.userInfo = res.json().user;
          return this.userInfo;
        });
    }
  }

  update(user: any): Observable<any> {
    const endPoint = this.config.getConfigParam('apiEndpoint') + '/users';
    return this.http.put(endPoint, user)
      .map(res => {
        this.userInfo = res.json().user;
        return this.userInfo;
      });
  }

  changePassword(data: any): Observable<any> {
    const endPoint = this.config.getConfigParam('apiEndpoint') + '/users/change-password';
    return this.http.put(endPoint, data)
      .map(res => {
        this.userInfo = res.json().user;
        return this.userInfo;
      });
  }
}
