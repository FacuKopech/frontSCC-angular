import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login_services/login.service';
import { ApiService } from '../user_services/api.service';

@Injectable({
  providedIn: 'root',
})
export class IdleTimeoutService {
  private timeout: any;
  private readonly timeoutDuration = 5 * 60 * 1000;

  constructor(private router: Router, private loginService: LoginService, private ngZone: NgZone, private apiService: ApiService) { }

  startTracking() {
    this.resetTimer();
    this.attachEventListeners();
  }

  private attachEventListeners() {
    ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach((event) => {
      window.addEventListener(event, () => this.resetTimer());
    });
  }

  private resetTimer() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.logoutUser();
    }, this.timeoutDuration);
  }

  private logoutUser() {
    this.ngZone.run(() => {
      this.apiService.Logout().subscribe(res => {
        if (res) {
          this.loginService.logoutUser();
          this.loginService.setLogoutMessage();
          localStorage.removeItem('flag');
          localStorage.removeItem('token');
          window.location.reload();
        }
      });
    });
  }
}
