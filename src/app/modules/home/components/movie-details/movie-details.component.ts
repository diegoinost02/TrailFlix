import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

import { Movie } from 'src/app/core/InterfaceMovies';

import { MoviesService } from 'src/app/core/services/movies.service';
import { PipeUrlService } from '../pipe-url.service';
import { MovieTrailerComponent } from '../movie-trailer/movie-trailer.component';
import { IFav } from 'src/app/core/Interfaces';
import { Video } from 'src/app/core/InterfaceVideo';
import { Popup } from 'src/app/core/Models';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MovieDetailsComponent>,
    private api: MoviesService,
    private pipeUrl: PipeUrlService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    if (this.data.keyYoutube !== undefined) {
      this.movie.idMovie = this.data.idMovie;
    } else {
      this.movie.idMovie = this.data.id;
    }
    this.movie.poster_path = this.data.poster_path;
    this.movie.overview = this.data.overview;
    this.getVideos();
  }

  videosArray: any = [];

  videoKey: any = [];

  youtubeLink: string = '';

  transformedlink: any;

  movie: IFav = {
    idMovie: this.data.id,
    poster_path: this.data.poster_path,
    overview: this.data.overview,
    keyYoutube: '',
  };

  dataPopUp: Popup = {
    title: '',
    body: '',
  };

  getVideos() {
    this.api.getVideosIdMovie(this.movie.idMovie!).subscribe((videos) => {
      this.videosArray = videos;

      this.getTrailer();
      this.movie.keyYoutube = this.youtubeLink;
    });
  }

  getTrailer() {
    this.videoKey = this.videosArray.find(
      (video: Video) => video.type === 'Trailer'
    );

    this.youtubeLink = 'https://www.youtube.com/embed/' + this.videoKey.key;

    this.transformedlink = this.pipeUrl.transform(this.youtubeLink);
  }

  dialogTrailer(youtubeLink: any) {
    this.dialog.open(MovieTrailerComponent, {
      width: '100%',
      height: '80%',
      data: youtubeLink,
    });
  }

  addFavorite() {
    this.dialogRef.close(this.movie);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  removeFavorites() {
    (this.dataPopUp.body = this.movie.idMovie!), (this.dataPopUp.title = '');

    this.dialogRef.close(this.dataPopUp);
  }
}
