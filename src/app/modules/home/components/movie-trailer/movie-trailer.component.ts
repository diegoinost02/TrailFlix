import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { PipeUrlService } from '../pipe-url.service';
import { MoviesService } from 'src/app/core/services/movies.service';


@Component({
  selector: 'app-movie-trailer',
  templateUrl: './movie-trailer.component.html',
  styleUrls: ['./movie-trailer.component.css']
})
export class MovieTrailerComponent  {
  
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<MovieDetailsComponent>, private api: MoviesService,
  private pipeUrl: PipeUrlService,)
  {
   
  }
}
