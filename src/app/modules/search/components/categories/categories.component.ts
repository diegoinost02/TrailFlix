import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { elementAt } from 'rxjs';
import { Movie } from 'src/app/core/InterfaceMovies';
import { IFav } from 'src/app/core/Interfaces';
import { Fav, Popup, User } from 'src/app/core/Models';
import { FavServiceService } from 'src/app/core/services/fav-service.service';
import { MoviesService } from 'src/app/core/services/movies.service';
import { UsersService } from 'src/app/core/services/users.service';
import { MovieDetailsComponent } from 'src/app/modules/home/components/movie-details/movie-details.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  user: User = new User();

  constructor(
    private apiMovie: MoviesService,
    private userService: UsersService,
    private dialog: MatDialog,
    private favSer: FavServiceService
  ) {}
  ngOnInit(): void {
    this.loadData();

    // this.genreAction();
  }

  genreMovie: any = [];

  favMovies: Fav[] = [];

  movieFav: Fav = new Fav();

  dataPopUp: Popup = {
    title: '',
    body: '',
  };

  genreClicked: boolean = false;

  genreAction() {
    this.apiMovie.genreType = `28`;

    this.genreMovie = this.apiMovie.getMoviesbygenre().subscribe((movies) => {
      this.genreMovie = movies;
      console.log(this.genreMovie);

      this.genreClicked = true;
    });
  }
  genreAdventure() {
    this.apiMovie.genreType = `12`;

    this.genreMovie = this.apiMovie.getMoviesbygenre().subscribe((movies) => {
      this.genreMovie = movies;
      console.log(this.genreMovie);

      this.genreClicked = true;
    });
  }
  genreComedy() {
    this.apiMovie.genreType = `35`;

    this.genreMovie = this.apiMovie.getMoviesbygenre().subscribe((movies) => {
      this.genreMovie = movies;
      console.log(this.genreMovie);

      this.genreClicked = true;
    });
  }
  genreSuspense() {
    this.apiMovie.genreType = `53`;

    this.genreMovie = this.apiMovie.getMoviesbygenre().subscribe((movies) => {
      this.genreMovie = movies;
      console.log(this.genreMovie);

      this.genreClicked = true;
    });
  }
  genreDrama() {
    this.apiMovie.genreType = `18`;

    this.genreMovie = this.apiMovie.getMoviesbygenre().subscribe((movies) => {
      this.genreMovie = movies;
      console.log(this.genreMovie);

      this.genreClicked = true;
    });
  }
  genreFamily() {
    this.apiMovie.genreType = `14`;

    this.genreMovie = this.apiMovie.getMoviesbygenre().subscribe((movies) => {
      this.genreMovie = movies;
      console.log(this.genreMovie);

      this.genreClicked = true;
    });
  }

  loadData() {
    const user = this.userService.getCurrentUser();
    if (user) {
      user.subscribe((user: User[]) => {
        this.user = user[0];
      });
    }
  }
  //FAV MOVIES

  addFavMovie() {
    this.favMovies = this.favSer.addFavMovie(this.favMovies, this.movieFav);
  }

  getFavMovies() {
    this.favMovies = this.favSer.getFavMovies(this.favMovies, this.user);
  }

  deleteFavMovie(idMovie: number | any, idUser: number) {
    this.favSer.deleteFavMovie(idMovie, idUser);

    this.getFavMovies();
  }

  dialoMovieDetails(movie: Movie) {
    const dialogRef = this.dialog.open(MovieDetailsComponent, {
      width: 'auto',
      height: 'auto',
      data: movie,
      backdropClass: 'background-dialog',
      disableClose: true,
      enterAnimationDuration: '.3s',
      exitAnimationDuration: '.25s',
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
