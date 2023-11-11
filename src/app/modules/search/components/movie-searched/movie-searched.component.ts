import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/core/InterfaceMovies';
import { MoviesService } from 'src/app/core/services/movies.service';
import { MovieDetailsComponent } from 'src/app/modules/home/components/movie-details/movie-details.component';

@Component({
  selector: 'app-movie-searched',
  templateUrl: './movie-searched.component.html',
  styleUrls: ['./movie-searched.component.css'],
})
export class MovieSearchedComponent implements OnInit, OnDestroy {
  constructor(private movieSer: MoviesService, private route:ActivatedRoute, private dialog:MatDialog) {
    this.search = this.route.snapshot.paramMap.get('movie')!;

  }

  ngOnInit(): void {
    this.getMoviesSearch();
    console.log(this.search);
  }

  ngOnDestroy(): void {
    this.movieSer.resetPageSearch();
  }

  movies: any = [];
  search: string = '';

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

  dialoMovieDetails(movie: Movie) {
    this.dialog.open(MovieDetailsComponent, {
      width: '100%',
      height: 'auto',
      data: movie,
      backdropClass: 'background-dialog',
    });
  }
}
