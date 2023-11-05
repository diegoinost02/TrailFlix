import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/core/services/movies.service';

@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.css']
})
export class MovieGridComponent implements OnInit {

  constructor(private movieSer:MoviesService) {}
  
 
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
}
