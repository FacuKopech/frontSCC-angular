import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedAuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor() {}

  setLoggedIn(value: boolean) {
    this.loggedInSubject.next(value);
  }
}
