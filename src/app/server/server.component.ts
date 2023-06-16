import { Component, OnInit } from '@angular/core';
import { Observable, of, map, tap, catchError } from 'rxjs';
import { CustomResponse } from '../interface/custom-response.interface';
import { Server } from '../interface/server.interface';
import { ServerService } from '../service/server.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit {
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
