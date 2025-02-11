import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RingService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getRings(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('http://localhost:3000/rings', { headers });
  }

  getRing(ringId: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('http://localhost:3000/rings/' + ringId, { headers });
  }

  getRingCount(): Observable<number> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.getRings().pipe(
      map((data: any[]) => data.filter(categories => categories._id).length)
    );
  }

}
