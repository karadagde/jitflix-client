import { Server } from './server.interface';

export interface CustomResponse {
  timeStamp: Date;
  statusCode: number;
  message: string;
  reason: string;
  status: string;
  developerMessage: string;
  data: { servers?: Server[]; server?: Server };
}
