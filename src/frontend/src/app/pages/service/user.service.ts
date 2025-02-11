import { HttpClient } from '@angular/common/http';
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

  getUser(username: string) {
    return this.http.get('http://localhost:3000/users/' + username);
  }

  async createUser(username: string, password: string, mail: string): Promise<any> {
    const data = {
      "username": username,
      "password": password,
      "mail": mail,
      "roles": "user"
    };
    console.log(data.username, data.password, data.mail, data.roles);
    try {
      const response = await this.http.post('http://localhost:3000/users', data).toPromise();
      console.log('User created successfully:', response);
      return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    console.log('Checking if user is logged in');
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const response: Observable<Object> = await this.http.post('http://localhost:3000/auth/validate-token', { token });
        if(response) {
          console.log('User is logged in, Token validated');
          return true;
        } else {
          console.log('User is not logged in');
          await this.router.navigate(['/auth/login']);
          return false;
        }
      } catch (error) {
        console.error('Token validation failed', error);
        await this.router.navigate(['/auth/login']);
        return false;
      }
    } else {
      console.log('User has no access token');
      await this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
