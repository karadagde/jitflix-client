import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';

@Injectable()
export class FileUploadService {
  constructor(private readonly http: HttpClient) {}

  uploadFile(
    file: ArrayBuffer,
    id: string,
    chunk: number,
    totalChunks: number
  ) {
    this.http
      .post('http://localhost:8080/videos/upload/large-file' + id, file, {
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Range': `bytes ${chunk}-${
            chunk + file.byteLength
          }/${totalChunks}`,
          'Content-Length': `${file.byteLength}`,
        },
      })
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
