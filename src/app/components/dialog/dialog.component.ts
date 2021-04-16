import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styles: [
  ]
})
export class Dialog {

  constructor( public dialogRef: MatDialogRef<Dialog>, @Inject(MAT_DIALOG_DATA) public data: any ) {}

  onNoClick(): void
  {
    this.dialogRef.close();
  }

}
