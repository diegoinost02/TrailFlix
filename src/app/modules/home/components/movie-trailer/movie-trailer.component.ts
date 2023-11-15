import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-trailer',
  templateUrl: './movie-trailer.component.html',
  styleUrls: ['./movie-trailer.component.css'],
})
export class MovieTrailerComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
