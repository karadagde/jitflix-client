import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() drawer!: MatDrawer;

  constructor(private readonly router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  toggleDrawer(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.drawer.toggle();
  }
}
