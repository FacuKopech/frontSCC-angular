import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedInUser: any;

  constructor() {
    const storedUser = localStorage.getItem('loggedInUser');
    this.loggedInUser = storedUser ? JSON.parse(storedUser) : null;
  }

  setLoggedInUser(user: any): void {
    this.loggedInUser = user;
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  getLoggedInUser(): any {
    return this.loggedInUser;
  }

  logoutUser(): boolean {
    this.loggedInUser = null;
    localStorage.removeItem('loggedInUser');

    return false;
  }

  setLogoutMessage(): void {
    const message = "Cerramos tu sesión debido a inactividad por más de 5 minutos";
    localStorage.setItem('logoutMessage', message);
  }

  getLogoutMessage(): string{
    const message = localStorage.getItem('logoutMessage');
    localStorage.removeItem('logoutMessage');
    return message || "";
  }
}
