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

  logoutUser(): void {
    this.loggedInUser = null;
    localStorage.removeItem('loggedInUser');
  }
}
