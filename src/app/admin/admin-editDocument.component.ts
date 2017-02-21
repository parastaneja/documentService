import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute ,Params, } from '@angular/router';
import {Subscription} from 'rxjs';
import {AdminService} from './admin.service';
import {UserService} from '../user.service';

@Component({
    templateUrl: './admin-editDocument.component.html',
    // styleUrls: ['app/admin/admin-editDocument.component.css']
     styleUrls: ['../login/login.component.css']
})
export class EditDocumentComponent{
        selectedProjectid;
    editDocumentName;
    viewMessage;
    selectedDocumentid;
    busy:Subscription;

    constructor(
        private _adminService: AdminService, 
        private _activatedRouter: ActivatedRoute,
        private _userService : UserService,
        private _router : Router) { }
            ngOnInit(): void {
    this._activatedRouter.params.forEach((params: Params) => {
      this.selectedProjectid = +params['project_id'];
      this.selectedDocumentid = params['metadata_id'];
      console.log('selectedProject:'+this.selectedProjectid);
      this.editDocumentName = this._userService.getDocumentName(this.selectedProjectid,this.selectedDocumentid);
        });
    }

      public back()
      { this._router.navigate(['./admin/createDocument', this.selectedProjectid]);
     }

     editDocument() {
       
   this.busy= this._adminService.editDocument(this.editDocumentName,this.selectedDocumentid).subscribe(
            res => {
                if (res === 'done') {
                    this._adminService.loadUsers().subscribe(res => {
                        if (res === 'done') {
                        this._adminService.loadUsers().subscribe();
                        this._router.navigate(['./admin/createDocument', this.selectedProjectid]);
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
