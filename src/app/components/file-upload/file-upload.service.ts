import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
      `http://jitflix.azurewebsites.net/videos/upload/large-file/${id}`,
      file,
      {
        headers,
        reportProgress: true,
        observe: 'events',
      }
    );
  }
}
