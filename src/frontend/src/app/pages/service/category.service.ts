import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getCategories(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('http://localhost:3000/categories', { headers });
  }

  getCategory(categoryId: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('http://localhost:3000/categories/' + categoryId, { headers });
  }

  getCategoriesCount(): Observable<number> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.getCategories().pipe(
      map((data: any[]) => data.filter(categories => categories._id).length)
    );
  }

  postCategory(category: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post('http://localhost:3000/categories', category, { headers });
  }

  updateCategory(category: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = {
      name: category.name,
      description: category.description
    };
    return this.http.patch('http://localhost:3000/categories/' + category.id, body, { headers });
  }

  deleteCategory(categoryId: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete('http://localhost:3000/categories/' + categoryId, { headers });
  }
}
