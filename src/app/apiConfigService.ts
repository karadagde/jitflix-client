import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiConfigService {
  private _apiUrl = environment.apiUrl;
  private _ws = environment.wsUrl;

  get apiUrl(): string {
    return this._apiUrl;
  }

  get ws(): string {
    return this._ws;
  }
}
