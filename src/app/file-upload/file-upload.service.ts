import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';

@Injectable()
export class FileUploadService {
  constructor(private readonly http: HttpClient) {}

  uploadFile(file: FormData, id: string) {
    this.http
      .post('http://localhost:8080/videos/upload/' + id, file)
      .pipe(
        tap((res) => console.log(res)),
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe();
  }
}
