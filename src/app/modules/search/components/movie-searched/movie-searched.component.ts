import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/core/InterfaceMovies';
import { User } from 'src/app/core/Models';
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

   movies: any = [];
  search: string = '';

  constructor(
    private movieSer: MoviesService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private userService:UsersService
  ) {
    this.search = this.route.snapshot.paramMap.get('movie')!;
  }

  ngOnInit(): void {
    this.getMoviesSearch();
    console.log(this.search);
    this.loadData();
  }

  ngOnDestroy(): void {
    this.movieSer.resetPageSearch();
  }

 
  getMoviesSearch() {
    this.movieSer.SearchMovies(this.search).subscribe((movies) => {
      this.movies = movies;
      console.log(this.movies);
    });
  }

  appendSearch() {
    this.movieSer.SearchMovies(this.search).subscribe((movies) => {
      this.movies = [...this.movies, ...movies];
      console.log(this.movies);
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

  dialoMovieDetails(movie: Movie) {
    const dialogRef = this.dialog.open(MovieDetailsComponent, {
      width: '50%',
      height: 'auto',
      data: movie,
      backdropClass: 'background-dialog',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
      }
    });
  }
}
