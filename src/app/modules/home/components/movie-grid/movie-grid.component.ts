import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MoviesService } from 'src/app/core/services/movies.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { Movie } from 'src/app/core/InterfaceMovies';
import { IFav } from 'src/app/core/Interfaces';

@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.css'],
})
export class MovieGridComponent implements OnInit, OnDestroy {
  constructor(private movieSer: MoviesService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getMovies();
    this.getBanner();

    this.getFavMovies(2);
  }

  ngOnDestroy(): void {
    this.movieSer.resetPageHome();
  }

  movies: any = [];
  banner: any = [];
  favMovies: any = [];

  ///PARA TEST
  search: string = 'Transformers';
  id: number = 2;

  movieFav: IFav = {
    idUser: 2,
    idMovie: '5070s89',
    linkPoster: '/A4j8S6moJS2zNtRR8oWF08gRnL5.jpg',
    keyYoutube: 'X4d_v-HyR4o',
    overview:
      "Recently fired and desperate for work, a troubled young man named Mike agrees to take a position as a night security guard at an abandoned theme restaurant: Freddy Fazbear's Pizzeria. But he soon discovers that nothing at Freddy's is what it seems.",
  };
  ///TEST

  getMovies() {
    this.movieSer.getPeliculasTrendig().subscribe((movies) => {
      this.movies = movies;
      console.log(this.movies);
    });
  }

  appendMovies() {
    this.movieSer.getPeliculasTrendig().subscribe((movies) => {
      this.movies = [...this.movies, ...movies];
      console.log(this.movies);
    });
  }

  getBanner() {
    this.movieSer.getPeliculas().subscribe((movies) => {
      this.banner = movies;
      console.log(this.banner);
    });
  }

  ///FAV MOVIE FUNCIONES

  addFavMovie() {
    let isDuplicated: boolean = this.favMovies.some(
      (movie: IFav) => movie.idMovie === this.movieFav.idMovie
    );

    if (!isDuplicated) {
      this.movieSer.putFavMovie(this.movieFav).subscribe((updatedFavMovies) => {
        this.favMovies.push(updatedFavMovies);
      });
      console.log('agregado a favoritos');
    } else {
      console.log('Ya existe en la lista de fav');
    }
  }

  getFavMovies(id: number) {
    this.movieSer.getFavMovies(this.id).subscribe((favMovies) => {
      this.favMovies = favMovies;
      console.log(this.favMovies);
    });
  }

  deleteFavMovie(id: number) {
    this.movieSer.removeFavMovie(id).subscribe((data: any) => {
      this.favMovies = this.favMovies.filter((movie: IFav) => movie.id !== id);

      console.log('Se elimino de la db', data);
    });
  }

  ///DIALOG

  dialoMovieDetails(movie: Movie) {
    this.dialog.open(MovieDetailsComponent, {
      width: '100%',
      height: 'auto',
      data: movie,
      backdropClass: 'background-dialog',
    });
  }
}
