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
        const content = event.target.result;
        const size = 1000;
        const totalChunks = content.byteLength / size;
        const fileName = Math.random().toString(36).slice(-6) + files[0].name;

        for (let i = 0; i < totalChunks + 1; i++) {
          const chunk = content.slice(i * size, (i + 1) * size);
          this.service.uploadFile(chunk, fileName, i, totalChunks);
        }
      };
    }
  }
}
