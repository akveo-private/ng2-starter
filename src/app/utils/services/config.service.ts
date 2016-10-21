import { Injectable, Inject } from '@angular/core';

@Injectable()
export class ConfigService {

  private config = {
    development: {
      filesEndpoint: 'http://localhost:3003',
      dataEndpoint: 'http://localhost:3003/data',
      apiEndpoint: 'http://localhost:3003/api',
      redirectUrl: '/',
      loginUrl: '/login'
    },
    production: {
      filesEndpoint: 'http://stg1.akveo.com/gamaya-backend',
      dataEndpoint: 'http://stg1.akveo.com/gamaya-backend/data',
      apiEndpoint: 'http://stg1.akveo.com/gamaya-backend/api',
      redirectUrl: '/',
      loginUrl: '/login'
    }
  };

  constructor(@Inject('environment') protected env: string) {
  }

  getConfigParam(name: string, value = null): any {
    return typeof this.getConfig()[name] !== 'undefined' ? this.getConfig()[name] : value;
  }

  protected getConfig(): any {
    return this.config[this.env];
  }

}
