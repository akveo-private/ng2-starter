import { NgModule, ModuleWithProviders, Injector }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpModule, Http, RequestOptions, XHRBackend } from '@angular/http';

import { AuthService } from './auth.service';
import { HttpClient } from './http-client';
import { UserService } from './user.service';

@NgModule({
  imports: [CommonModule, HttpModule, RouterModule]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: AuthModule,
      providers: [
        AuthService,
        UserService,
        {
          provide: Http, useFactory: (injector, backend, defaultOptions, router) => {
            return new HttpClient(injector, backend, defaultOptions, router);
          },
          deps: [Injector, XHRBackend, RequestOptions, Router]
        }
      ],
    };
  }
}
