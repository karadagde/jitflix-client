import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() drawer!: MatDrawer;

  isAuthenticated = this.auth.isAuthenticatedUser();

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService
  ) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  toggleDrawer(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.drawer.toggle();
  }
  logout() {
    this.auth.logout().subscribe((response) => {
      if (response) {
        this.navigateToLogin();
      }
    });
  }
}
