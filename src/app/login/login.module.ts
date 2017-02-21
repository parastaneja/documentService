import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
//import {BusyModule} from 'angular2-busy';
import {MaterialModule} from '@angular/material';

import {LoginComponent} from './login.component';
import {LoginService} from './login.service';
import {SignUpComponent} from './signUp.component';


@NgModule({
    imports:[
        FormsModule,
        BrowserModule,
        HttpModule,
        MaterialModule.forRoot()
        //BusyModule
    ],
    declarations: [
        LoginComponent,
        SignUpComponent
    ],
    providers: [
        LoginService
    ]
})
export class LoginModule{

}