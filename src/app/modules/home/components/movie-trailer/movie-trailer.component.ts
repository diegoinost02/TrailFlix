import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { PipeUrlService } from '../pipe-url.service';
import { MoviesService } from 'src/app/core/services/movies.service';
import { Video } from 'src/app/core/InterfaceVideo';

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
    this.getVideos(this.data.id)
  }

  videosArray: any = [];

  videoKey: any = [];

  youtubeLink: string = '';

  transformedlink: any;

  getVideos(id: number) {
    this.api.getVideosIdMovie(this.data.id).subscribe((videos) => {
      this.videosArray = videos;

      this.getTrailer();
    });
  }

  getTrailer() {
    this.videoKey = this.videosArray.find(
      (video: Video) => video.type === 'Trailer'
    );

    this.youtubeLink = 'https://www.youtube.com/embed/' + this.videoKey.key;

    this.transformedlink = this.pipeUrl.transform(this.youtubeLink);
  }
  

}
