import { UserRole } from '../components/enum/user-role.enum';

export interface UserSignup {
  email: string;
  password: string;
  rePassword: string;
  language: string;
  country: string;
  role: UserRole;
}
