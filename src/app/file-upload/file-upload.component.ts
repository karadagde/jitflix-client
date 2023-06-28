import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
  @ViewChild('fileUpload') fileUpload!: ElementRef<HTMLInputElement>;
  constructor(private readonly service: FileUploadService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      //convert file to MULTIPART_FORM_DATA_VALUE
      let formData = new FormData();
      formData.append('file', file);
      console.log(file);
      console.log(file.name);
      console.log(file.type);
      console.log({ formData });
      this.service.uploadFile(formData, file.name);
    }
  }
  // onUpload() {
  //   console.log('Upload');
  //   const files = this.fileUpload.nativeElement.files;
  //   if (files && files.length > 0) {
  //     const formData = new FormData();
  //     //   // loop through all the selected files and add them to the formData object
  //     for (let i = 0; i < files.length; i++) {
  //       const file = files[i];
  //       console.log(file);
  //       formData.append('uploads[]', file, file.name);
  //     }
  //     console.log(formData);
  //     console.log(this.fileUpload.nativeElement.files);
  //     console.log(this.fileUpload.nativeElement.DOCUMENT_NODE);
  //     this.service.uploadFile(formData, files[0].name);
  //   }
  // }
}
