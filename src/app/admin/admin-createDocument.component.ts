import {Component} from '@angular/core';
import { ActivatedRoute ,Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DocumentComponent} from './document.component';
import {AdminService} from './admin.service';
import {UserService} from '../user.service';


@Component({
    templateUrl: './admin-createDocument.component.html',
    //styleUrls: [ 'app/admin/admin-createDocument.component.css' ]
     styleUrls: ['../login/login.component.css']
})
export class CreateDocumentComponent {

    private projectName;
    private documents;
    private documentColumns;
    private viewMessage: String;
    private selectedProjectid;
    private selectedDocumentid;
    busy: Subscription;
    private document = new DocumentComponent();
    constructor(
        private _adminService: AdminService, 
        private _activatedRouter: ActivatedRoute,
        private _userService : UserService,
        private _router : Router) { }


    ngOnInit(): void {
    this._activatedRouter.params.forEach((params: Params) => {
      this.selectedProjectid = +params['id'];
      this.selectedDocumentid = params['metadata_id'];
      console.log('selectedProject:'+this.selectedProjectid);
      console.log('selectedDocument:'+this.selectedDocumentid);
      this.projectName = this._userService.getProjectName(this.selectedProjectid);
      this.documents = this._userService.getUserProjectDocuments(this.selectedProjectid);
        });
    }

    public back(){
        this._router.navigate(["./admin"]);
    }
    displayColumns(userProjectDocument){
        console.log(userProjectDocument);
        console.log(userProjectDocument.metadata_id);
        
        this._router.navigate(['./admin/addColumn',this.selectedProjectid,userProjectDocument.metadata_id]);
    }
     editDocument(document) {
        console.log('editing documents');
        this._router.navigate(['./admin/editDocument',this.selectedProjectid,document.metadata_id]);
    }

    createDocument() {
  this.busy= this._adminService.requestToCreateDocument(this.document,this.selectedProjectid).subscribe(
            res => {
                if (res === 'done') {
                     this._adminService.loadUsers().subscribe(res => {
                        if (res === 'done') {
                        window.location.reload();
                        this._router.navigate(['./admin/createDocument/'+this.selectedProjectid]);
                        } else {
                            this.viewMessage = res;
                        }
                    },
                    err => {
                    this.viewMessage = err
                    });
                } else {
                    this.viewMessage = res;
                }
            },
            err => {
                this.viewMessage = err
            }
        );
    } 
    
    deleteDocument(document){
                var txt;
        var r = confirm("Are you sure you want to delete?");
        if (r == true) {
            txt = this.ok(document);
        }
    }
    ok(document) {
        console.log('selectedDocument:' + document.metadata_id);
        this._adminService.deleteDocument(document.metadata_id).subscribe(
            res => {
                if (res === 'done') {
                    this._adminService.loadUsers().subscribe(res => {
                        if (res === 'done') {
                            window.location.reload();
                            //this._adminService.loadUsers().subscribe();
                        } else {
                            this.viewMessage = res;
                        }
                    },
                        err => {
                            this.viewMessage = err
                        });
                } else {
                    this.viewMessage = res;
                }
            },
            err => {
                this.viewMessage = err
            }
        );


    }
}


