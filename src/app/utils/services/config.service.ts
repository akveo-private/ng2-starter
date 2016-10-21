import { Injectable, Inject, Optional } from '@angular/core';

@Injectable()
export class ConfigService {

  private defaultEnv = 'development';

  private config = {
    development: {
      filesEndpoint: 'http://localhost:3003',
      dataEndpoint: 'http://localhost:3003/data',
      apiEndpoint: 'http://localhost:3003/api',
      redirectUrl: '/',
      loginUrl: '/login'
    },
    production: {
      filesEndpoint: '',
      dataEndpoint: '',
      apiEndpoint: '',
      redirectUrl: '/',
      loginUrl: '/login'
    }
  };

  constructor(@Optional() @Inject('environment') protected env: string) {
    this.env = this.env || this.defaultEnv;
  }

  getConfigParam(name: string, value = null): any {
    return typeof this.getConfig()[name] !== 'undefined' ? this.getConfig()[name] : value;
  }

  protected getConfig(): any {
    return this.config[this.env];
  }

}
