import { Injectable } from '@angular/core';
import {LocalStorageService} from './localStorage.service';

@Injectable()
export class UserService {
    constructor(
        private _localStorage : LocalStorageService
    ) { }

    public getUserName(){
        return this._localStorage.retrieve('userDetails')[0].users.username;
    }

    public getProjectName(projectId){
        var projects = this.getUserProjects();
        for(var j=0;j<projects.length;j++){
            if(projects[j].project_id == projectId){
                return projects[j].project_name;
            }
        }
    }        
          
        public getDocumentName(selectedProjectid,selectedDocumentid){
        var documents = this.getUserProjectDocuments(selectedProjectid);
        for(var i=0;i<documents.length;i++){
            if(documents[i].metadata_id == selectedDocumentid){
                return documents[i].metadata_name;
            }
        }
    }
    
     public getColumnName(selectedProjectid,selectedDocumentid,selectedColumnid){
        var columns = this.getUserProjectDocumentColumns(selectedProjectid,selectedDocumentid);
        for(var k=0;k<columns.length;k++){
            if(columns[k].meta_spec_id == selectedColumnid){
                return columns[k].metadata_name;
            }
        }
    }



    public getUserProjects(){
        return this._localStorage.retrieve('userDetails')[0].users.projects;
    }
    public getUserProjectDocumentColumns(selectedProjectid,selectedDocumentid){
        var documents = this.getUserProjectDocuments(selectedProjectid);
        for(var i=0;i<documents.length;i++){
            if(documents[i].metadata_id == selectedDocumentid){
                return documents[i].headers;
            }
        }

    }
    public getUserProjectDocuments(selectedProjectid){
        var projects = this.getUserProjects();
        for(var j=0;j<projects.length;j++){
            if(projects[j].project_id == selectedProjectid){
                return projects[j].documents;
            }
        }
    }

}