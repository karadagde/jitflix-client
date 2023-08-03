import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated) {
    console.log('authenticated', authService.isAuthenticated);
    return true;
  }

  return router.parseUrl('/login');
};
