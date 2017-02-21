import {ModuleWithProviders} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

import {AppComponent} from './app.component';

import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from './auth-guard.service';
import {SignUpComponent} from './login/signUp.component'


const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login', 
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignUpComponent
    },
    {
        path: 'admin',
        canActivate : [AuthGuard],
        component: SignUpComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);