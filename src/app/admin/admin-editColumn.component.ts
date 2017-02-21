import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute ,Params, } from '@angular/router';
import {adminRouting} from './admin.routing';
import {Subscription} from 'rxjs';
import {AdminService} from './admin.service';
import {UserService} from '../user.service';

@Component({
    templateUrl: './admin-editColumn.component.html',
     //styleUrls: ['app/admin/admin-editDocument.component.css']
      styleUrls: ['../login/login.component.css']
})
export class EditColumnComponent{
    selectedProjectid;
    editDocumentName;
    editColumnName;
    viewMessage;
    selectedDocumentid;
    selectedColumnid;
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
      this.selectedColumnid =params['meta_spec_id'];
      console.log('selectedProject:'+this.selectedProjectid);
      this.editColumnName = this._userService.getColumnName(this.selectedProjectid,this.selectedDocumentid,this.selectedColumnid);
        });
    }

      public back()
      { this._router.navigate(['./admin/addColumn', this.selectedProjectid,this.selectedDocumentid]);
     }

     editColumn() {
       
   this.busy = this._adminService.editColumn(this.editColumnName,this.selectedColumnid).subscribe(
            res => {
                if (res === 'done') {
                    this._adminService.loadUsers().subscribe(res => {
                        if (res === 'done') {
                        this._adminService.loadUsers().subscribe();
                        this._router.navigate(['./admin/addColumn', this.selectedProjectid,this.selectedDocumentid]);
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
