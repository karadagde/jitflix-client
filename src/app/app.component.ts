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
export class AppComponent implements OnInit {
  appState$: Observable<Server[]> = of([]);
  loadingState: Boolean = true;

  displayedColumns: string[] = [
    'image',
    'ipAddress',
    'name',
    'memory',
    'type',
    'status',
    'ping',
    'action',
  ];

  constructor(private serverService: ServerService) {}

  ngOnInit() {
    this.appState$ = this.serverService.servers$.pipe(
      map((response: CustomResponse) => {
        if (response && response.data && response.data.servers) {
          return response.data.servers;
        } else if (response.data.server) {
          return [response.data.server];
        } else {
          return [];
        }
      }),
      tap(() => {
        this.loadingState = false;
      }),
      catchError((error: string) => {
        return of([]);
      })
    );
  }
}
