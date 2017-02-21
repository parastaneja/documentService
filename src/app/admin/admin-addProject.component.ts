import {Component} from '@angular/core';
import { ActivatedRoute ,Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AdminService} from './admin.service';
import {UserService} from '../user.service';


@Component({
    templateUrl: './admin-addProject.component.html',
    //styleUrls: [ 'app/admin/admin-addProject.component.css' ]
        styleUrls: ['../login/login.component.css']
})
export class AddProjectComponent {

    private projectName;
    private projectDesc;
    private viewMessage;
     busy: Subscription;
    constructor(
        private _adminService: AdminService, 
        private _activatedRouter: ActivatedRoute,
        private _userService : UserService,
        private _router : Router) { }
        
    addProject() {
        //console.log('raise a request for adding a project');
        //this._adminService.addProject(this.projectName,this.projectDesc);
     this.busy= this._adminService.addProject(this.projectName,this.projectDesc).subscribe(
            res => {
                if (res === 'done') {
             this.busy= this._adminService.loadUsers().subscribe(res => {
                        if (res === 'done') {
                   this.busy=this._adminService.loadUsers().subscribe();
                        this._router.navigate(['./admin']);
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