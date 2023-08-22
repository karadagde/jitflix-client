import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  concatMap,
  delay,
  from,
  take,
  tap,
} from 'rxjs';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
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

        let completedChunks = 0; // Counter for completed chunks

        const uploadRequests = [];
        for (let i = 0; i < totalChunks; i++) {
          const chunk = content.slice(i * size, (i + 1) * size);
          const request = this.fileUploadService
            .uploadFile(chunk, fileName, i, totalChunks, size)
            .pipe(delay(100), take(1)); // Delay each request by 0.1 second

          uploadRequests.push(request);
        }

        from(uploadRequests)
          .pipe(
            concatMap((request) => request),
            tap(() => {
              completedChunks++; // Increment the completed chunks counter
              console.log(completedChunks);
              console.log(totalChunks);
              console.log(completedChunks / totalChunks);
              const progress = Math.round(
                (completedChunks / totalChunks) * 100
              );
              console.log(progress);
              this.uploadProgressSubject.next(progress);
            })
          )
          .subscribe({
            next: (event: HttpEvent<any>) => {
              if (event.type === HttpEventType.UploadProgress && event.total) {
                // Do any necessary progress updates for individual chunks here
              }
            },
            error: (error: any) => {
              console.log('Upload error:', error);
            },
            complete: () => {
              console.log('Upload process completed');
            },
          });
      };
    }
  }

  // this is the first working version of consecutive uploads
  /*
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

        const uploadRequests = [];
        for (let i = 0; i < totalChunks; i++) {
          const chunk = content.slice(i * size, (i + 1) * size);
          const request = this.fileUploadService
            .uploadFile(chunk, fileName, i, totalChunks, size)
            .pipe(delay(1000)); // Delay each request by 1 second

          uploadRequests.push(request);
        }

        from(uploadRequests)
          .pipe(concatMap((request) => request))
          .subscribe({
            next: (event: HttpEvent<any>) => {
              if (event.type === HttpEventType.UploadProgress && event.total) {
                this.uploadProgressSubject.next(
                  Math.round((100 * event.loaded) / event.total)
                );
              }
            },
            error: (error: any) => {
              console.log('Upload error:', error);
            },
            complete: () => {
              console.log('Upload process completed');
            },
          });
      };
    }
  }
*/
  // uploadFile() {
  //   const files = this.fileUpload.nativeElement.files;
  //   if (files && files.length > 0) {
  //     const fileReader = new FileReader();
  //     fileReader.readAsArrayBuffer(files[0]);

  //     fileReader.onload = async (event) => {
  //       if (
  //         !event.target ||
  //         !event.target.result ||
  //         typeof event.target.result === 'string'
  //       ) {
  //         return;
  //       }
  //       const content = event.target.result as ArrayBuffer;
  //       const size = 1000000;
  //       const totalChunks = Math.ceil(content.byteLength / size);
  //       const fileName = files[0].name;
  //       // const fileName = Math.random().toString(36).slice(-6) + files[0].name;

  //       const uploadRequests = [];
  //       for (let i = 0; i < totalChunks; i++) {
  //         const chunk = content.slice(i * size, (i + 1) * size);
  //         uploadRequests.push(
  //           this.fileUploadService.uploadFile(
  //             chunk,
  //             fileName,
  //             i,
  //             totalChunks,
  //             size
  //           )
  //         );
  //       }

  //       // for await (const event of uploadRequests) {
  //       //   event.subscribe({
  //       //     next: (event: HttpEvent<any>) => {
  //       //       if (event.type === HttpEventType.UploadProgress && event.total) {
  //       //         this.uploadProgressSubject.next(
  //       //           Math.round((100 * event.loaded) / event.total)
  //       //         );
  //       //       }
  //       //       console.log(event);
  //       //     },
  //       //     error: (error: any) => console.log(error),
  //       //     complete: () => console.log('Upload completed'),
  //       //   });
  //       // }

  //       const progressObservables = uploadRequests.map(
  //         (request) =>
  //           new Observable((observer: Observer<HttpEvent<any>>) => {
  //             request.pipe(throttleTime(100)).subscribe({
  //               next: (event: HttpEvent<any>) => {
  //                 if (
  //                   event.type === HttpEventType.UploadProgress &&
  //                   event.total
  //                 ) {
  //                   this.uploadProgressSubject.next(
  //                     Math.round((100 * event.loaded) / event.total)
  //                   );
  //                 }
  //                 observer.next(event);
  //               },
  //               error: (error: any) => observer.error(error),
  //               complete: () => observer.complete(),
  //             });
  //           })
  //       );

  //       forkJoin(progressObservables).subscribe({
  //         next: (results: HttpEvent<any>[]) => {
  //           // All chunks have been uploaded
  //           console.log('Upload completed');
  //         },
  //         error: (error: any) => {
  //           // Handle error
  //           console.log('Upload error:', error);
  //         },
  //         complete: () => {
  //           // Handle completion
  //           console.log('Upload process completed');
  //         },
  //       });
  //     };
  //   }
  // }
}
