import { Injectable } from '@angular/core';
import { MoviesService } from './movies.service';
import { Fav } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class FavServiceService {

  constructor(private apiMovie:MoviesService) { }

  //Se modularizo una parte de las llamadas a fav y filtran informacion

  addFavMovie(favMovies:any,movieToAdd:any):Fav[] 
  {
    let isDuplicated: boolean = favMovies.some(
      (movie: Fav) => movie.idMovie === movieToAdd.idMovie
    );

    if (!isDuplicated) {
      this.apiMovie.putFavMovie(movieToAdd).subscribe((updatedFavMovies) => {
        favMovies.push(updatedFavMovies);
      });
      console.log('agregado a favoritos');
    } else {
      console.log('Ya existe en la lista de fav');
    }
    return favMovies;
  }

  getFavMovies(favMovies:any,user:any):Fav[]
   {
    this.apiMovie.getFavMovies(user.id!).subscribe((apiMovies) => {
      favMovies = apiMovies;
      console.log(favMovies);
    });

    return favMovies;
  }

  deleteFavMovie(idMovie: number | any, idUser: number)
  {
    this.apiMovie.removeFavMovie(idMovie, idUser).subscribe((data: any) => {
      
      console.log('Se elimino de la db', data);
      // this.getFavMovies();
     
    });
    
  }

}
