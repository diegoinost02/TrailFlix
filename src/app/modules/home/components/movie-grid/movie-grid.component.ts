import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MoviesService } from 'src/app/core/services/movies.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { Movie } from 'src/app/core/InterfaceMovies';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { IFav } from 'src/app/core/Interfaces';

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
    favMovies:any = [];
    searchMovies:any = [];

    search:string = "Transformers"
    id:number = 2;

    movieFav:IFav = {
      idUser: 2,
      idMovie: "507089",
      linkPoster: "/A4j8S6moJS2zNtRR8oWF08gRnL5.jpg",
      keyYoutube: "X4d_v-HyR4o",
      overview: "Recently fired and desperate for work, a troubled young man named Mike agrees to take a position as a night security guard at an abandoned theme restaurant: Freddy Fazbear's Pizzeria. But he soon discovers that nothing at Freddy's is what it seems."
    };
    


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

  ///FAV MOVIE FUNCIONES

  addFavMovie()
  {
    this.movieSer.putFavMovie(this.movieFav).subscribe(
      next => {
        console.log("Agregado de forma correcta")
      },
      error => {
        console.log(error);
      }
    )
  }

  getFavMovies(id:number)
  {
    this.movieSer.getFavMovies(this.id).subscribe(favMovies =>{
      this.favMovies = favMovies;
      console.log(this.favMovies);
    })
  }
  deleteFavMovie(id:number){

    this.movieSer.removeFavMovie(id).subscribe((data:any)=>{
      console.log("Se elimino de la db",data);
    });

  }
 
///DIALOG

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
