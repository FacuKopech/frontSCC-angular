import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { ApiService } from '../services/user_services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedAuthService } from '../services/sharedAuthService/shared-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private userService: ApiService, private router: Router, private authService: SharedAuthService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.userService.isLoggedIn().subscribe(res => {
        if(res){
          this.userService.ObtenerTipoPersonaLogueada().subscribe((res: any[]) => {
            var rolesArray: any[] = [];
            rolesArray = route.data['roles'];

            const hasCommonRole = rolesArray.some(roleAllowed =>
              res.some(obj => obj.tipo === roleAllowed)
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
          },
          (error:HttpErrorResponse) => {
            if(error.status >= 400){
              this.authService.setUnauthorized(true);
              observer.next(false);
              observer.complete();
            }
          });
        }else{
          this.authService.setUnauthorized(true)
          observer.next(false);
          observer.complete();
        }

      });
    });
  }
}
