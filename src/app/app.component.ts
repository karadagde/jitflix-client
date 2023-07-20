import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SideNavDialogComponent } from './components/shared/side-nav-dialog/side-nav-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private readonly dialog: MatDialog) {}
  dialogRef: MatDialogRef<SideNavDialogComponent> | undefined;
  openDialog(): void {
    if (!this.dialogRef) {
      this.dialogRef = this.dialog.open(SideNavDialogComponent, {
        width: '250px',
        height: '100%',
        position: {
          left: '-250px',
          top: '0px',
        },
        hasBackdrop: true,
        panelClass: 'custom-modalbox',
      });
    } else {
      this.dialogRef.addPanelClass('animate-close');
      setTimeout(() => {
        this.dialogRef!.close();
        this.dialogRef = undefined;
      }, 500);
    }
  }
}
