import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MoviesService } from 'src/app/core/services/movies.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { Movie } from 'src/app/core/InterfaceMovies';
import { IFav } from 'src/app/core/Interfaces';
import { Popup, User } from 'src/app/core/Models';
import { UsersService } from 'src/app/core/services/users.service';
import { FavServiceService } from 'src/app/core/services/fav-service.service';

@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.css'],
})
export class MovieGridComponent implements OnInit, OnDestroy {
  movies: any = [];
  banner: any = [];
  favMovies: any = [];

  user: User = new User();
  search: string = '';

  movieFav: IFav = {
    idUser: 0,
    idMovie: 0,
    poster_path: '',
    keyYoutube: '',
    overview: '',
  };

  dataPopUp: Popup = {
    title: '',
    body: '',
  };

  constructor(
    private movieSer: MoviesService,
    private dialog: MatDialog,
    private userService: UsersService,
    private favSer: FavServiceService
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getBanner();
    this.loadData();
  }

  ngOnDestroy(): void {
    this.movieSer.resetPageHome();
  }

  loadData() {
    const user = this.userService.getCurrentUser();
    if (user) {
      user.subscribe((user: User[]) => {
        this.user = user[0];
        this.getFavMovies();
      });
    }
  }

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

  ///FAV MOVIE FUNCIONES son distintas por la asincronia

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

  getFavMovies() {
    this.movieSer.getFavMovies(this.user.id!).subscribe((favMovies) => {
      this.favMovies = favMovies;
      console.log(this.favMovies);
    });
  }

  deleteFavMovie(idMovie: number | any, idUser: number) {
    this.movieSer.removeFavMovie(idMovie, idUser).subscribe((data: any) => {
      this.favMovies = this.favMovies.filter(
        (movie: IFav) => movie.id !== idMovie
      );

      console.log('Se elimino de la db', data);
      this.getFavMovies();
    });
  }


  ///DIALOG

  dialoMovieDetails(movie: Movie) {
    const dialogRef = this.dialog.open(MovieDetailsComponent, {
      width: '40%',
      height: 'auto',
      data: movie,
      backdropClass: 'background-dialog',
      disableClose: true,
      enterAnimationDuration: ".3s",
      exitAnimationDuration: ".25s"
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.keyYoutube !== undefined) {
        this.movieFav = result;
        this.movieFav.idUser = this.user.id;
        console.log(this.movieFav);
        this.addFavMovie();

        this.getFavMovies();
        console.log('Se guardo el favorito');
        console.log('Se actualizaron los favoritos');
      } else if (result) {
        this.dataPopUp = result;

        this.dataPopUp.title = this.user.id!;

        console.log(this.dataPopUp);

        this.deleteFavMovie(this.dataPopUp.body, this.dataPopUp.title);
      }
    });
  }
}
