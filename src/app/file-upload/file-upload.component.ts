import { Component, ElementRef, ViewChild } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { tap, forkJoin, Observable, Observer, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  @ViewChild('fileUpload') fileUpload!: ElementRef<HTMLInputElement>;

  private readonly uploadProgressSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  public readonly uploadProgress$: Observable<number> =
    this.uploadProgressSubject.asObservable();

  constructor(private fileUploadService: FileUploadService) {}

  uploadFile() {
    const files = this.fileUpload.nativeElement.files;
    if (files && files.length > 0) {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(files[0]);

      fileReader.onload = async (event) => {
        if (
          !event.target ||
          !event.target.result ||
          typeof event.target.result === 'string'
        ) {
          return;
        }
        const content = event.target.result as ArrayBuffer;
        const size = 1000000;
        const totalChunks = Math.ceil(content.byteLength / size);
        const fileName = files[0].name;
        // const fileName = Math.random().toString(36).slice(-6) + files[0].name;

        const uploadRequests = [];
        for (let i = 0; i < totalChunks; i++) {
          const chunk = content.slice(i * size, (i + 1) * size);
          uploadRequests.push(
            this.fileUploadService.uploadFile(
              chunk,
              fileName,
              i,
              totalChunks,
              size
            )
          );
        }

        const progressObservables = uploadRequests.map(
          (request) =>
            new Observable((observer: Observer<HttpEvent<any>>) => {
              request.subscribe({
                next: (event: HttpEvent<any>) => {
                  if (
                    event.type === HttpEventType.UploadProgress &&
                    event.total
                  ) {
                    this.uploadProgressSubject.next(
                      Math.round((100 * event.loaded) / event.total)
                    );
                  }
                  observer.next(event);
                },
                error: (error: any) => observer.error(error),
                complete: () => observer.complete(),
              });
            })
        );

        forkJoin(progressObservables).subscribe({
          next: (results: HttpEvent<any>[]) => {
            // All chunks have been uploaded
            console.log('Upload completed');
          },
          error: (error: any) => {
            // Handle error
            console.log('Upload error:', error);
          },
          complete: () => {
            // Handle completion
            console.log('Upload process completed');
          },
        });
      };
    }
  }
}
