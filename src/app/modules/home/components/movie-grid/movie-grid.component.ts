import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MoviesService } from 'src/app/core/services/movies.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { Movie } from 'src/app/core/InterfaceMovies';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.css']
})
export class MovieGridComponent implements OnInit {

  constructor(private movieSer:MoviesService,private dialog:MatDialog) {}
  
 
  ngOnInit(): void {
   
  this.getMovies();
  this.getBanner();
  }
    movies:any = [];
    banner:any = [];
  
    


  getMovies()
  {
    this.movieSer.getPeliculasTrendig().subscribe(movies=>{
      this.movies = movies;
      console.log(this.movies);
    })
  }

  appendMovies()
  {
    this.movieSer.getPeliculasTrendig().subscribe(movies=>{
      this.movies = [...this.movies,...movies]
      console.log(this.movies);
    })
  }


  getBanner()
  {
    this.movieSer.getPeliculas().subscribe(movies=>{
      this.banner = movies;
      console.log(this.banner);
    })
  }

  dialoMovieDetails(movie:Movie)
  {
    
    const dialogRef = this.dialog.open(MovieDetailsComponent,{

    
      width: "70%",
      height: "90%",
      data:movie,
      backdropClass:'background-dialog',
   
    });

  }

}
