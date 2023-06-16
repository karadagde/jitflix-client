import { Status } from '../enum/status.enum';

export interface Server {
  id: number;
  name: string;
  status: Status;
  ipAddress: string;
  memory: string;
  type: string;
  imageUrl: string;
}
