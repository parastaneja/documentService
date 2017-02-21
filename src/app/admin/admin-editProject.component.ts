import {Component} from '@angular/core';
import { ActivatedRoute ,Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AdminService} from './admin.service';
import {UserService} from '../user.service';

@Component({
    templateUrl: './admin-editProject.component.html',
    // styleUrls: [ 'app/admin/admin-editProject.component.css' ]
     styleUrls: ['../login/login.component.css']
})
export class EditProjectComponent{
    selectedProjectid;
    editName;
    viewMessage;
    busy: Subscription;

    constructor(
        private _adminService: AdminService, 
        private _activatedRouter: ActivatedRoute,
        private _userService : UserService,
        private _router : Router) { }

    ngOnInit(): void {
    this._activatedRouter.params.forEach((params: Params) => {
      this.selectedProjectid = +params['id'];
      console.log('selectedProject:'+this.selectedProjectid);
      this.editName = this._userService.getProjectName(this.selectedProjectid);
        });
    }
         public back(){
        this._router.navigate(['./admin']);
    }
     editProject() {
       
   this.busy= this._adminService.editProject(this.editName,this.selectedProjectid).subscribe(
            res => {
                if (res === 'done') {
                    this._adminService.loadUsers().subscribe(res => {
                        if (res === 'done') {
                        this._adminService.loadUsers().subscribe();
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


 