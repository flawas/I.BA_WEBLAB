import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getTechnologies(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('http://localhost:3000/technologies', { headers });
  }

  getTechnolgiesCountPublished(): Observable<number> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.getTechnologies().pipe(
      map((data: any[]) => data.filter(tech => tech.published).length)
    );
  }

  getTechnolgiesCountDraft(): Observable<number> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.getTechnologies().pipe(
      map((data: any[]) => data.filter(tech => !tech.published).length)
    );
  }

  postTechnology(technology: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post('http://localhost:3000/technologies', technology, { headers });
  }

  updateTechnology(technology: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post('http://localhost:3000/technologies', technology, { headers });
  }

}
