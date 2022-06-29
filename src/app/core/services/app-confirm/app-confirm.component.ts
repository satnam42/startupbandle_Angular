import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm',
  template: `<h1 matDialogTitle class="mb-05 text-center" >{{ data.title }}</h1>
    <div mat-dialog-content class="mb-1 text-center">{{ data.message }}</div>
    <div mat-dialog-actions>
      <button type="button" mat-raised-button style="background-color:#10174c;color:white"(click)="dialogRef.close(true)">OK</button>
      &nbsp;
      <span fxFlex></span>
      <button type="button" color="accent" mat-raised-button style="margin-left:auto" (click)="dialogRef.close(false)">Cancel</button>
    </div>`,
})
export class AppComfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<AppComfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
}