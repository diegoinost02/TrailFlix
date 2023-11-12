import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Popup } from 'src/app/core/Models';

@Component({
  selector: 'app-alert-popup',
  templateUrl: './alert-popup.component.html',
  styleUrls: ['./alert-popup.component.css']
})
export class AlertPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA)public data: Popup, private dialogRef: MatDialogRef<AlertPopupComponent>) {}

}
