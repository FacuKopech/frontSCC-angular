import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { ApiService } from '../services/user_services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedAuthService } from '../services/sharedAuthService/shared-auth.service';
import { LoginService } from '../services/login_services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private authService: SharedAuthService, private loginService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const loggedInUser = this.loginService.getLoggedInUser();
      if(loggedInUser != null){
        var rolesArray: any[] = [];
        rolesArray = route.data['roles'];

        const hasCommonRole = rolesArray.some(roleAllowed =>
          loggedInUser.roles.some((rol:any) => rol.tipo === roleAllowed)
        );

        if(hasCommonRole){
          this.authService.setUnauthorized(false);
          observer.next(true);
          observer.complete();
        }else{
          this.authService.setUnauthorized(true);
          observer.next(false);
          observer.complete();
        }
      }
      // this.userService.isLoggedIn().subscribe(res => {
      //   if(res){          
      //     const isLoggedInResult = JSON.stringify(res);
      //     localStorage.setItem('isLoggedInResult', isLoggedInResult);
      //     this.userService.ObtenerTipoPersonaLogueada().subscribe((res: any[]) => {
      //       if(res){      
      //         const rolesUserLoggedIn = JSON.stringify(res);
      //         localStorage.setItem('rolesUserLoggedIn', rolesUserLoggedIn);
      //       }
            
      //       var rolesArray: any[] = [];
      //       rolesArray = route.data['roles'];

      //       const hasCommonRole = rolesArray.some(roleAllowed =>
      //         res.some(obj => obj.tipo === roleAllowed)
      //       );

      //       if(hasCommonRole){
      //         this.authService.setUnauthorized(false);
      //         observer.next(true);
      //         observer.complete();
      //       }else{
      //         this.authService.setUnauthorized(true);
      //         observer.next(false);
      //         observer.complete();
      //       }
      //     },
      //     (error:HttpErrorResponse) => {
      //       if(error.status >= 400){
      //         this.authService.setUnauthorized(true);
      //         observer.next(false);
      //         observer.complete();
      //       }
      //     });
      //   }else if(res == null){      
      //     this.authService.setUnauthorized(true)
      //     observer.next(false);
      //     observer.complete();
      //   }else{
      //     this.authService.setUnauthorized(true)
      //     observer.next(false);
      //     observer.complete();
      //   }
      // });
    });
  }
}
