import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerComponent } from './server.component';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { FileUploadService } from '../file-upload/file-upload.service';

@NgModule({
  declarations: [ServerComponent, FileUploadComponent],

  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatToolbarModule,
    RouterModule.forChild([{ path: '', component: ServerComponent }]),
  ],
  providers: [FileUploadService],
})
export class ServerModule {}
