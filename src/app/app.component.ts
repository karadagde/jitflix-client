import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SideNavDialogComponent } from './components/shared/side-nav-dialog/side-nav-dialog.component';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(private readonly router: Router) {}
  dialogRef: MatDialogRef<SideNavDialogComponent> | undefined;

  toggleDrawer(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.drawer.toggle();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
