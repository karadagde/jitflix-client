import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component } from '@angular/core';
import { MatDialogContainer, MatDialogRef } from '@angular/material/dialog';

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
