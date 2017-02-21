import {Injectable} from '@angular/core'
import {Http, Headers, RequestOptions} from '@angular/http'

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import {ConfigService} from '../config';
import {LocalStorageService} from '../localStorage.service';

import {DocumentComponent} from './document.component';


@Injectable()
export class AdminService {
    private createDocumentURL;
    private getDocumentsURL;
    private body: String;
    private headers;
    private options;
    private documentCreated : boolean;
    private genericURL: String;
    private createProjectURL;
    private loadUserURL;
    private addColumnURL;
    private editProjectURL;
    private editColumnURL;
    private deleteProjectURL;
    private editDocumentURL;
    private deleteDocumentURL;
    private deleteColumnURL;

    constructor(
        private _http:Http, 
        private _configService: ConfigService, 
        private _localStorageService: LocalStorageService
        ){
        this._configService.load().then(data =>{
            this.genericURL = this._configService.getConfig("url");
        });
    }

    loadUsers(): Observable<String>{
        this.loadUserURL = this.genericURL+'/api/loadUsers';
        this.headers = new Headers({ 'Authorization': this._localStorageService.retrieve('auth_token') });
        this.options = new RequestOptions({ headers: this.headers });
        return this._http.get(this.loadUserURL,this.options).map(res => {
            if(res.json().success){
                this._localStorageService.store('userDetails',res.json().userDetails);
                return 'done';
            } else{
                return res.json().msg;
            }
        })
        .catch(this.handleError);
    }

    addProject(projectName: String,projectDesc: String): Observable<String> {
        this.createProjectURL = this.genericURL+'/api/addProject';
        this.body = 'projectName='+projectName+'&projectDesc='+projectDesc;
        this.headers = new Headers({ 'Authorization': this._localStorageService.retrieve('auth_token') });
        this.headers.append("Content-Type",'application/x-www-form-urlencoded');
        this.options = new RequestOptions({ headers: this.headers });
        return this._http.post(this.createProjectURL,this.body,this.options).map(res => {
            if(res.json().success){
                return 'done';
            } else{
                return res.json().msg;
            }
        })
        .catch(this.handleError);
    }
     editProject(editName:String,selectedProjectid:String): Observable<String> {
        this.editProjectURL = this.genericURL+'/api/editProject';
        this.body = 'editName='+editName+'&selectedProjectid='+selectedProjectid;
        this.headers = new Headers({ 'Authorization': this._localStorageService.retrieve('auth_token') });
        this.headers.append("Content-Type",'application/x-www-form-urlencoded');
        this.options = new RequestOptions({ headers: this.headers });
        return this._http.post(this.editProjectURL,this.body,this.options).map(res => {
            if(res.json().success){
                return 'done';
            } else{
                return res.json().msg;
            }
        })
        .catch(this.handleError);
    }
         editDocument(editDocumentName:String,selectedDocumentid:String): Observable<String> {
        this.editDocumentURL = this.genericURL+'/api/editDocument';
        this.body = 'editDocumentName='+editDocumentName+'&selectedDocumentid='+selectedDocumentid;
        this.headers = new Headers({ 'Authorization': this._localStorageService.retrieve('auth_token') });
        this.headers.append("Content-Type",'application/x-www-form-urlencoded');
        this.options = new RequestOptions({ headers: this.headers });
        return this._http.post(this.editDocumentURL,this.body,this.options).map(res => {
            if(res.json().success){
                return 'done';
            } else{
                return res.json().msg;
            }
        })
        .catch(this.handleError);
    }
             editColumn(editColumnName:String,selectedColumnid:String): Observable<String> {
        this.editColumnURL = this.genericURL+'/api/editColumn';
        this.body = 'editColumnName='+editColumnName+'&selectedColumnid='+selectedColumnid;
        this.headers = new Headers({ 'Authorization': this._localStorageService.retrieve('auth_token') });
        this.headers.append("Content-Type",'application/x-www-form-urlencoded');
        this.options = new RequestOptions({ headers: this.headers });
        return this._http.post(this.editColumnURL,this.body,this.options).map(res => {
            if(res.json().success){
                return 'done';
            } else{
                return res.json().msg;
            }
        })
        .catch(this.handleError);
    }
deleteProject(selectedProjectid:String): Observable<String> {
        this.deleteProjectURL = this.genericURL+'/api/deleteProject';
         this.body = 'selectedProjectid='+selectedProjectid;
         this.headers = new Headers({ 'Authorization': this._localStorageService.retrieve('auth_token') });
        this.headers.append("Content-Type",'application/x-www-form-urlencoded');
        this.options = new RequestOptions({ headers: this.headers });
        return this._http.post(this.deleteProjectURL,this.body,this.options).map(res => {
            if(res.json().success){
                return 'done';
            } else{
                return res.json().msg;
            }
        })
        .catch(this.handleError);
    }


    requestToAddColumn(metadata_id,column_name):Observable<String>{
        this.addColumnURL = this.genericURL+'/api/addColumn';
        this.body = 'metadata_id='+metadata_id+'&column_name=' + column_name;
        console.log("body:"+this.body);
        this.headers = new Headers({ 'Authorization': this._localStorageService.retrieve('auth_token') });
        this.headers.append("Content-Type",'application/x-www-form-urlencoded');

        this.options = new RequestOptions({ headers: this.headers });
        return this._http.post(this.addColumnURL,this.body,this.options).map(res => {
            if(res.json().success){
                return 'done';
            } else{
                return res.json().msg;
            }
        })
        .catch(this.handleError);
    }

    requestToCreateDocument(document: DocumentComponent,projectId: String): Observable<String>{
        
        this.createDocumentURL =this.genericURL+'/api/createDocument';
        this.body = 'project_id='+projectId+'&metadata_name=' + document.metadata_name 
                    + '&metadata_description=' + document.metadata_description;
        console.log(this.body);
        this.headers = new Headers({ 'Authorization': this._localStorageService.retrieve('auth_token') });
        this.headers.append("Content-Type",'application/x-www-form-urlencoded');

        this.options = new RequestOptions({ headers: this.headers });
        console.log('auth:'+localStorage.getItem('auth_token'));
        return this._http.post(this.createDocumentURL,this.body,this.options).map(res => {
            if(res.json().success){
                return 'done';
            } else{
                return res.json().msg;
            }
        })
        .catch(this.handleError);
    }

    /*requestToGetDocuments(): Observable<String>{
        this.getDocumentsURL = 'http://localhost:3034/api/getDocuments';
        this.headers = new Headers({ 'Authorization': localStorage.getItem('auth_token') });
        this.options = new RequestOptions({ headers: this.headers });

        return this._http.get(this.createDocumentURL,this.options).map(res => {
            return res.json();
        })
        .catch(this.handleError);
    }*/
    deleteDocument(selectedDocumentid:String): Observable<String> {
        this.deleteDocumentURL = this.genericURL+'/api/deleteDocument';
         this.body = 'selectedDocumentid='+selectedDocumentid;
         this.headers = new Headers({ 'Authorization': this._localStorageService.retrieve('auth_token') });
        this.headers.append("Content-Type",'application/x-www-form-urlencoded');
        this.options = new RequestOptions({ headers: this.headers });
        return this._http.post(this.deleteDocumentURL,this.body,this.options).map(res => {
            if(res.json().success){
                return 'done';
            } else{
                return res.json().msg;
            }
        })
        .catch(this.handleError);
    }
        deleteColumn(selectedColumnid:String): Observable<String> {
        this.deleteColumnURL = this.genericURL+'/api/deleteColumn';
         this.body = 'selectedColumnid='+selectedColumnid;
         this.headers = new Headers({ 'Authorization': this._localStorageService.retrieve('auth_token') });
        this.headers.append("Content-Type",'application/x-www-form-urlencoded');
        this.options = new RequestOptions({ headers: this.headers });
        return this._http.post(this.deleteColumnURL,this.body,this.options).map(res => {
            if(res.json().success){
                return 'done';
            } else{
                return res.json().msg;
            }
        })
        .catch(this.handleError);
    }


    private handleError(error: any) {
        localStorage.removeItem('auth_token');
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        //console.error(errMsg);
        return Observable.throw(errMsg);
    }
}