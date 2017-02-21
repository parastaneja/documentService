import {Component} from '@angular/core';
import {AdminService} from './admin.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';



import {LocalStorageService} from '../localStorage.service';
import {UserService} from '../user.service';

@Component({
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
    userProjects;
    private viewMessage;
    selectedProjectid;
    busy: Subscription;


    constructor(
        private _adminService: AdminService,
        private _router: Router,
        private router: Router,
        private _activatedRouter: ActivatedRoute,
        private _localStorage: LocalStorageService,
        private _userService: UserService) {
        console.log('in Admin dashboard component');
        this.userProjects = this._userService.getUserProjects();
       

        
    }
      
  
    addProject() {
        console.log('creating Project');
        this.router.navigate(['./admin/addProject']);
    }

    editProject(userProject) {
        console.log('editing Project');
        this.router.navigate(['./admin/editProject', userProject.project_id]);
    }

    displayDocuments(userProject) {
        console.log('displaying documents');
        this.router.navigate(['./admin/createDocument', userProject.project_id]);
    }
   
    deleteProject(userProject) {

        var txt;
        var r = confirm("Are you sure you want to delete?");
        if (r == true) {
            txt = this.ok(userProject);
        }
    }
    ok(userProject) {
        console.log('selectedProject:' + userProject.project_id);
   this.busy= this._adminService.deleteProject(userProject.project_id).subscribe(
            res => {
                if (res === 'done') {
                    
       this.busy= this._adminService.loadUsers().subscribe(res => {
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


