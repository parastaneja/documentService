import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { AdminComponent }           from './admin.component';
import { AdminDashboardComponent }  from './admin-dashboard.component';
import {CreateDocumentComponent} from './admin-createDocument.component';
import {AddColumnComponent} from './admin-addColumn.component';
import {AddProjectComponent} from './admin-addProject.component';
import {EditProjectComponent} from './admin-editProject.component';
import {EditDocumentComponent} from './admin-editDocument.component';
import {EditColumnComponent} from './admin-editColumn.component';

import { AuthGuard }                from '../auth-guard.service';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canLoad : [AuthGuard],
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        //canActivateChild: [AuthGuard],
        children: [
          { path: 'createDocument/:id', component: CreateDocumentComponent },
          { path: 'addColumn/:project_id/:metadata_id', component: AddColumnComponent },
          { path: '', component: AdminDashboardComponent },
          { path: 'addProject', component: AddProjectComponent},
          { path: 'editProject/:id', component: EditProjectComponent},
          {path:'editDocument/:project_id/:metadata_id', component: EditDocumentComponent},
          {path:'editColumn/:project_id/:metadata_id/:meta_spec_id', component: EditColumnComponent}
        ]
      }
    ]
    
  }
];

export const adminRouting: ModuleWithProviders = RouterModule.forChild(adminRoutes);


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/