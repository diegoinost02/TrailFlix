import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { Movie } from 'src/app/core/InterfaceMovies';
import { Video } from 'src/app/core/InterfaceVideo';
import { MoviesService } from 'src/app/core/services/movies.service';
import { PipeUrlService } from '../pipe-url.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private dialogRef:MatDialogRef<MovieDetailsComponent>,private api:MoviesService,private pipeUrl:PipeUrlService) {}

   

  ngOnInit(): void {
   
    this.getVideos(this.data.id);
  }


 
  videosArray:any = [];

  videoKey:any = [];

  youtubeLink:string = '';

  transformedlink:any;


  getVideos(id:number)
  {
   this.api.getVideosIdMovie(this.data.id).subscribe(videos =>{

    this.videosArray = videos;

    this.getTrailer();

   }) 
  }

  getTrailer()
  {
    this.videoKey = this.videosArray.find((video: Video) => video.type === "Trailer" );

    this.youtubeLink = "https://www.youtube.com/embed/" + this.videoKey.key;
   
    this.transformedlink = this.pipeUrl.transform(this.youtubeLink);

  }
  
  

}
