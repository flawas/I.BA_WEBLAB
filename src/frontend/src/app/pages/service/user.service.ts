import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  createUser(user: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post('http://localhost:3000/users', user, { headers });
  }

  updateUser(user: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = {
      mail: user.mail,
      roles: user.roles
    };
    return this.http.patch('http://localhost:3000/users/' + user.id, body, { headers });
  }

  deleteUser(user: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete('http://localhost:3000/users/' + user, { headers });
  }

  getAll(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('http://localhost:3000/users', { headers });
  }


  async isLoggedIn(): Promise<boolean> {
    console.log('Checking if user is logged in');
    const token = localStorage.getItem('authToken');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      try {
        const response: any = await this.http.get('http://localhost:3000/auth/validate-token', { headers }).toPromise();
        console.log('Response:', response);
        if (response) { // Assuming the backend returns { valid: true } for a valid token
          console.log('User is logged in');
          return true;
        } else {
          console.log('User is not logged in');
          this.router.navigate(['/auth/login']).then(r => console.log('Navigated to login'));
          return false;
        }
      } catch (error) {
        console.error('Token validation failed', error);
        this.router.navigate(['/auth/login']).then(r => console.log('Navigated to login'));
        return false;
      }
    } else {
      console.log('User has no access token');
      this.router.navigate(['/auth/login']).then(r => console.log('Navigated to login'));
      return false;
    }
  }
  }
