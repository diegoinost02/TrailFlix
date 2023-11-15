import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/core/InterfaceMovies';
import { IFav } from 'src/app/core/Interfaces';
import { Popup, User } from 'src/app/core/Models';
import { FavServiceService } from 'src/app/core/services/fav-service.service';
import { MoviesService } from 'src/app/core/services/movies.service';
import { UsersService } from 'src/app/core/services/users.service';
import { MovieDetailsComponent } from 'src/app/modules/home/components/movie-details/movie-details.component';

@Component({
  selector: 'app-movie-searched',
  templateUrl: './movie-searched.component.html',
  styleUrls: ['./movie-searched.component.css'],
})
export class MovieSearchedComponent implements OnInit, OnDestroy {
  user: User = new User();

  //DONDE SE ALMACENA LAS PELICULAS, EN LA BUSUQEDA
  movies: any = [];

  search: string = '';

  favMovies: any = [];

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
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private userService: UsersService,
    private favSer:FavServiceService
  ) {
    this.search = this.route.snapshot.paramMap.get('movie')!;
  }

  ngOnInit(): void {
    if (this.search) {
      this.getMoviesSearch();
    }

    console.log(this.search);
    this.loadData();
    this.getFavMovies();
  }
  //RESET PAGE SEARCH
  ngOnDestroy(): void {
    this.movieSer.resetPageSearch();
  }

  //BUSCAR Y AGREGAR SEARCH
  getMoviesSearch() {
    this.movieSer.SearchMovies(this.search).subscribe((movies) => {
      this.movies = movies;
      console.log(this.movies);
    });
  }

  appendSearch() {

    if(this.search)
    {
      this.movieSer.SearchMovies(this.search).subscribe((movies) => {
      this.movies = [...this.movies, ...movies];
      console.log(this.movies);
    });
    }
    
  }
  //USER ACTUAL
  loadData() {
    const user = this.userService.getCurrentUser();
    if (user) {
      user.subscribe((user: User[]) => {
        this.user = user[0];
      });
    }
  }
  //FAV MOVIES
  addFavMovie()
  {
    this.favMovies =  this.favSer.addFavMovie(this.favMovies,this.movieFav);
  }

  getFavMovies()
  {
    this.favMovies = this.favSer.getFavMovies(this.favMovies,this.user);
  }

  deleteFavMovie(idMovie: number | any, idUser: number)
  {
    this.favSer.deleteFavMovie(idMovie,idUser);

    this.getFavMovies()
  }

  dialoMovieDetails(movie: Movie) {
    const dialogRef = this.dialog.open(MovieDetailsComponent, {
      width: '50%',
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
