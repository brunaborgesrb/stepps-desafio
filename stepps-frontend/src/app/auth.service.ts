import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && localStorage) {
      return !!localStorage.getItem('user');
    }
    return false;
  }

  getUser(): any {
    if (typeof window !== 'undefined' && localStorage) {
      return JSON.parse(localStorage.getItem('user') || '{}');
    }
    return null;
  }
}
