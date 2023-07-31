import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FileUploadService {
  constructor(private readonly http: HttpClient) {}

  uploadFile(
    file: ArrayBuffer,
    id: string,
    chunk: number,
    totalChunks: number,
    size: number
  ): Observable<HttpEvent<any>> {
    const start = chunk * size;
    const end = start + (file.byteLength - 1);
    const contentRange = `bytes ${start}-${end}/${totalChunks * size}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
      'Content-Range': contentRange,
    });

    return this.http.post(
      `http://localhost:8080/videos/upload/large-file/${id}`,
      file,
      {
        headers,
        reportProgress: true,
        observe: 'events',
      }
    );
  }
}
