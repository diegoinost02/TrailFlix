import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Movie } from 'src/app/core/InterfaceMovies';

import { MoviesService } from 'src/app/core/services/movies.service';
import { PipeUrlService } from '../pipe-url.service';
import { MovieTrailerComponent } from '../movie-trailer/movie-trailer.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent  {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MovieDetailsComponent>,
    private api: MoviesService,
    private pipeUrl: PipeUrlService,
    private dialog: MatDialog
  ) {}



  dialogTrailer(movie: Movie) {
    this.dialog.open(MovieTrailerComponent, {
      width: '100%',
      height: '80%',
      data: movie,
    });
  }
}
