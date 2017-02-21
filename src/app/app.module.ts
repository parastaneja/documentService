import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import {AdminModule} from './admin/admin.module'
import { LoginModule }  from './login/login.module';
import { AppComponent }         from './app.component';

//import {BusyModule} from 'angular2-busy';

import { routing } from './app.routing';
import {authProviders} from './auth-guard.service';
import {ConfigService} from './config';
import {LocalStorageService} from './localStorage.service';
import {UserService} from './user.service';

import 'hammerjs';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    LoginModule,
    AdminModule,
    routing
     //BusyModule,

    
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    authProviders,
    ConfigService,
    LocalStorageService,
    UserService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/