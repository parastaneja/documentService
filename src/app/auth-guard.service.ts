import {CanActivate,Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
CanLoad} from '@angular/router';
import {Injectable} from '@angular/core';

import {LoginService} from './login/login.service';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    console.log('Can Activated');
    //let url = state.url;
    return this.checkLogin();
  }

  checkLogin(): boolean{
    console.log(this.loginService);
    console.log('this.loginService.loggedIn:'+this.loginService.loggedIn);
    if(this.loginService.loggedIn){ return true;}

    this.router.navigate(['/login']);
    return false;
  }
}
export const authProviders = [AuthGuard];