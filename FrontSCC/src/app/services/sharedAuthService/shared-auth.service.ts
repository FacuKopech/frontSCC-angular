import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedAuthService {
  private unauthorizedSubject = new BehaviorSubject<boolean>(false);
  isUnauthorized$ = this.unauthorizedSubject.asObservable();

  constructor() {}

  setUnauthorized(value: boolean) {
    this.unauthorizedSubject.next(value);
  }
}
