import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http'

import {Credentials} from './credentials.component';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import {ConfigService} from '../config';
import {LocalStorageService} from '../localStorage.service';

@Injectable()
export class LoginService {

    loggedIn: boolean = false;
    private loginURL;
    private headers;
    private memberInfoAuthURL;
    private signUpURL;
    private body;
    private options;
    private genericURL;

    constructor(
        private _http: Http, 
        private _configService: ConfigService,
        private _localStorage : LocalStorageService
        ) {
        this.loggedIn = !!localStorage.getItem('auth_token');
        this._configService.load().then(data =>{
            this.genericURL = this._configService.getConfig("url");
        });
    }

    authenticate(cred: Credentials): Observable<String> {
        
        this.loginURL = this.genericURL+'/api/authenticate';
        this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        this.options = new RequestOptions({ headers: this.headers });
        console.log('UserName:' + cred.userName);
        this.body = 'username=' + cred.userName + '&password=' + cred.password;
        return this._http.post(this.loginURL, this.body, this.options)
        .map(res => {
            console.log(res.json());
            if(res.json().success){
                this.loggedIn = true;
                console.log('token:'+res.json().token);
                this._localStorage.store('auth_token', res.json().token);
                this._localStorage.store('userDetails',res.json().userDetails);
                console.log('loaded user');
            }  else{
                this.loggedIn = false;
            }
            return res.json().msg;
        })
        .catch(this.handleError);
    }

    /*loadUsers():Observable<String> {
        this.loginURL = this.genericURL+'/api/loadUsers';
        this.headers = new Headers({ 'Authorization': this._localStorage.retrieve('auth_token') });
        this.options = new RequestOptions({ headers: this.headers });
         return this._http.get(this.loginURL, this.options).map(res => {
             if(res.json().success){
                 this._localStorage.store('userDetails',res.json().userDetails);
             }
             //return res.json().msg;
        })
        .catch(this.handleError);
    }*/

    validateToken(): Observable<Boolean> {
        this.memberInfoAuthURL = this.genericURL+'/api/memberinfo';
        this.headers = new Headers({ 'Authorization': this._localStorage.retrieve('auth_token') });
        this.options = new RequestOptions({ headers: this.headers });
        return this._http.get(this.memberInfoAuthURL, this.options).map(this.validateTokenResponse)
        .catch(this.handleError);
    }

    private validateTokenResponse(res: Response) {
        let body = res.json();
        return body || {};
    }

    //signUp 
    signUp(userName: String, password: String,firstname: String,lastname: String,email: String): Observable<Response>  {
        this.signUpURL = this.genericURL+'/api/signup';
        this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        this.options = new RequestOptions({ headers: this.headers });
        this.body = 'username=' + userName + '&password=' + password + '&firstname=' + firstname +'&lastname=' + lastname +'&email=' + email;
        return this._http.post(this.signUpURL,this.body,this.options).map(this.signUpResponse).catch(this.handleError);
    }

    private signUpResponse(res: Response){
        //let body = res.json();
        //return body || {};
        return res;
    }

    private handleError(error: any) {
        console.log('in handle Error Method');
        this.loggedIn = false;
        this._localStorage.remove('auth_token');
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        //console.error(errMsg);
        return Observable.throw(errMsg);
    }

    logout() {
        this._localStorage.remove('auth_token');
        this._localStorage.remove('userDetails');
        this.loggedIn = false;
        console.log('User log out');
    }
}