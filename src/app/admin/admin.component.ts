import {Component} from '@angular/core';
import { Router } from '@angular/router';

import {LoginService} from '../login/login.service';
import {LocalStorageService} from '../localStorage.service';
import {UserService} from '../user.service';
import{Http} from '@angular/http';


@Component({
    template: `
        <form (ngSubmit)="logout()">
         <button type="submit">Logout</button>
        </form>
    <h3>Hello ,{{user}}</h3>
    <router-outlet></router-outlet>
    `
})
export class AdminComponent{
    private title : String; 
    private user;
    constructor(
            private _loginService : LoginService,
            private router: Router,
            private _localStorage : LocalStorageService,
            private _userService : UserService
        ){
            this.user = this._userService.getUserName();
        }
    ngOnInit(){ }

    logout(){
        this._loginService.logout();
        this.router.navigate(['./login']);
    }
}