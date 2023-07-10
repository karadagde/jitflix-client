import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SideNavDialogComponent } from './side-nav-dialog/side-nav-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private readonly dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(SideNavDialogComponent, {
      width: '250px',
      height: '100%',
      position: {
        left: '-250px',
        top: '0px',
      },
      hasBackdrop: true,
      panelClass: 'custom-modalbox',
    });
  }
}
