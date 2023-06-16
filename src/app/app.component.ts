import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ServerService } from './service/server.service';
import { CustomResponse } from './interface/custom-response.interface';
import { Observable, catchError, map, of, startWith, tap } from 'rxjs';
import { AppState } from './interface/app-state.interface';
import { DataState } from './enum/data-state.enum';
import { MatTableDataSource } from '@angular/material/table';
import { Server } from './interface/server.interface';
import { Status } from './enum/status.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
