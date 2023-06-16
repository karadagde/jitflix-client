import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomResponse } from '../interface/custom-response.interface';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Server } from '../interface/server.interface';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private readonly apiUrl: string = 'http://localhost:8080/';
  constructor(private http: HttpClient) {}

  servers$: Observable<CustomResponse> = this.http
    .get<CustomResponse>(`${this.apiUrl}server/list`)
    .pipe(tap(console.log), catchError(this.handleError));

  saveServer$ = (server: Server): Observable<CustomResponse> =>
    this.http
      .post<CustomResponse>(`${this.apiUrl}server/save`, server)
      .pipe(tap(console.log), catchError(this.handleError));

  pingServer$ = (ipAddress: string): Observable<CustomResponse> =>
    this.http
      .get<CustomResponse>(`${this.apiUrl}server/ping/${ipAddress}`)
      .pipe(tap(console.log), catchError(this.handleError));

  // add filter method here

  deleteServer$ = (id: number): Observable<CustomResponse> =>
    this.http
      .delete<CustomResponse>(`${this.apiUrl}server/delete/${id}`)
      .pipe(tap(console.log), catchError(this.handleError));

  private handleError(e: HttpErrorResponse): Observable<never> {
    console.log(e);
    return throwError(
      () => new Error(`Error! Status: ${e.status}, Message: ${e.error.message}`)
    );
  }
}
