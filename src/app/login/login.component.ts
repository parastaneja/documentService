import {Component} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Credentials} from './credentials.component';
import {LoginService} from './login.service';




@Component({
    selector: 'login',
    templateUrl: './login.component.html' ,
    styleUrls: ['./login.component.css']
})
export class LoginComponent{
        busy: Subscription;

    constructor( 
        private route: ActivatedRoute,
        private _loginService : LoginService, 
        private router: Router
            ){
        
    }

    cred = new Credentials();
    login(){
   this.busy=this._loginService.authenticate(this.cred).subscribe(msg => 
        {
            console.log(msg);
            if(this._loginService.loggedIn){
                this.router.navigate(['./admin']);
            } else{
                this.cred.userName = '';
                this.cred.password = '';
                this.cred.message = msg;
            }
        });
        


    }

    signup(){
        this.router.navigate(['./signup']);
    }
    
}