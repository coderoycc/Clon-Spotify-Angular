import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.cheekCookiesSession();
  }
  //verifica si existe una cookie
  cheekCookiesSession(): boolean{
    try{
      const token = this.cookieService.check('token');
      if(!token){
        this.router.navigate(['/', 'auth'])
        return false
      }
      return token
    }catch(e){
      console.log("Error", e)
      return false
    }
  }
}
