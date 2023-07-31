import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-side-nav-dialog',
  templateUrl: './side-nav-dialog.component.html',
  styleUrls: ['./side-nav-dialog.component.css'],
})
export class SideNavDialogComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<SideNavDialogComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.addPanelClass('animate-close');
    setTimeout(() => {
      this.dialogRef.close();
    }, 500);
  }
}
