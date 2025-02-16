import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RingService {

  constructor(
    private http: HttpClient,
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
    return this.http.get<any[]>('http://localhost:3000/rings', { headers }).pipe(
      map((data: any[]) => data.filter(categories => categories._id).length)
    );
  }

  postRing(ring: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post('http://localhost:3000/rings', ring, { headers });
  }

  updateRing(ring: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = {
      name: ring.name,
      description: ring.description
    };
    console.log(body);
    return this.http.patch('http://localhost:3000/rings/' + ring.id, body, { headers });
  }

  deleteRing(ringId: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete('http://localhost:3000/rings/' + ringId, { headers });
  }

}
