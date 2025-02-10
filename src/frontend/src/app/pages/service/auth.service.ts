// auth.service.ts
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    public router: Router
  ) {}


  isSignedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  signOut(): void {
    localStorage.removeItem('authToken');
  }
}
