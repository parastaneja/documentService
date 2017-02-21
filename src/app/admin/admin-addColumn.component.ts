import {Component} from '@angular/core';
import { ActivatedRoute ,Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DocumentComponent} from './document.component';
import {AdminService} from './admin.service';
import {UserService} from '../user.service';

@Component({
    templateUrl: './admin-addColumn.component.html',
   // styleUrls: [ 'app/admin/admin-addColumn.component.css' ]
     styleUrls: ['../login/login.component.css']  
})
export class AddColumnComponent {
    private columns;
    private documentName;
    private columnName;
    private selectedProjectid;
    busy:Subscription;
    //private documentColumns;
    private viewMessage: String;
    private selectedDocumentid;
     private selectedColumnid;
    //private document = new DocumentComponent();
    constructor(
        private _adminService: AdminService, 
        private _activatedRouter: ActivatedRoute,
        private _userService : UserService,
        private _router : Router) { }


    ngOnInit(): void {
    this._activatedRouter.params.forEach((params: Params) => {
      this.selectedProjectid = params['project_id'];
     this.selectedDocumentid = params['metadata_id']; 
     this.selectedColumnid = params['meta_spec_id']; 
      this.columns = this._userService.getUserProjectDocumentColumns(this.selectedProjectid,this.selectedDocumentid);
      this.documentName = this._userService.getDocumentName(this.selectedProjectid,this.selectedDocumentid);
        });
    }
    public back(){
        this._router.navigate(['./admin/createDocument',this.selectedProjectid]);
    }
     editColumn(column) {
        console.log('editing column,');
        this._router.navigate(['./admin/editColumn',this.selectedProjectid,this.selectedDocumentid,column.meta_spec_id]);
    }

    addColumn() {
  this.busy=this._adminService.requestToAddColumn(this.selectedDocumentid,this.columnName).subscribe(
            res => {
                if (res === 'done') {
                     this._adminService.loadUsers().subscribe(res => {
                        if (res === 'done') {
                        this._adminService.loadUsers().subscribe();
                        this._router.navigate(['./admin/addColumn/'+this.selectedProjectid+'/'+this.selectedDocumentid]);
                        window.location.reload();
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
     deleteColumn(column){
                var txt;
        var r = confirm("Are you sure you want to delete?");
        if (r == true) {
            txt = this.ok(column);
        }
    }
    ok(column) {
        console.log('selectedColumnid:' + column.meta_spec_id);
        this._adminService.deleteColumn(column.meta_spec_id).subscribe(
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
