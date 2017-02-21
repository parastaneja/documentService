import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { CommonModule }   from '@angular/common';
//import {BusyModule,BusyConfig} from 'angular2-busy';




import {AdminComponent} from './admin.component'
import {CreateDocumentComponent} from './admin-createDocument.component';
import {AddColumnComponent} from './admin-addColumn.component';
import {AdminDashboardComponent} from './admin-dashboard.component';
import {AddProjectComponent} from './admin-addProject.component';
import {EditProjectComponent} from './admin-editProject.component';
import {EditDocumentComponent} from './admin-editDocument.component';
import {EditColumnComponent} from './admin-editColumn.component';

import {AdminService} from './admin.service';

import {adminRouting} from './admin.routing';

@NgModule({
    imports:[
        FormsModule,
        BrowserModule,
        HttpModule,
        CommonModule,
        adminRouting,
        /* BusyModule.forRoot(
        	new BusyConfig({
                message:'Please wait...',
                template: `
                          <head>
                           <link rel="stylesheet" href="/node_modules/angular2-busy/build/style/busy.css">
                            </head>
                            {{message}} 
                `
              
            })
        )*/
    ],
    declarations: [
        AdminComponent,
        CreateDocumentComponent,
        AddColumnComponent,
        AdminDashboardComponent,
        EditColumnComponent,
        AddProjectComponent,
        EditProjectComponent,
        EditDocumentComponent

    ],
    providers: [
        AdminService
    ]
})
export class AdminModule{

}