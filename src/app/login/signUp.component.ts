import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {Subscription} from 'rxjs';

import {LoginService} from './login.service';


@Component({
    selector:"signup" ,
    templateUrl: './signUp.component.html',
    styleUrls: ['./login.component.css']
})
export class SignUpComponent{
    private userName: String;
    private password: String;
    private firstname: String;
     private lastname: String;
      private email: String;
    private viewMessage: String;
    private age: Number = 10;
     busy: Subscription;

    constructor(private _loginService: LoginService, private router: Router){}

    signUp(){
     this.busy=this._loginService.signUp(this.userName,this.password,this.firstname,this.lastname,this.email)
     .subscribe(res => {
         console.log(res.json());
         
                 if(res.json().success){
                     this.router.navigate(['./login']);
                 }
                 this.viewMessage = res.json().msg;
            },
            err => console.error(err),
            () => {
                this.userName = '';
                this.password = '';
                this.firstname='';
                this.lastname='';
                this.email='';
            }
        );
    }
}
        


























