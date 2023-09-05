import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { SideNavDialogComponent } from './components/shared/side-nav-dialog/side-nav-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}
  dialogRef: MatDialogRef<SideNavDialogComponent> | undefined;

  toggleDrawer(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.drawer.toggle();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.authService.getInitialXsrfToken().pipe(take(1)).subscribe();
  }
}
