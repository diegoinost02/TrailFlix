import { Injectable } from '@angular/core';
import { MoviesService } from './movies.service';
import { IFav } from '../Interfaces';

@Injectable({
  providedIn: 'root'
})
export class FavServiceService {

  constructor(private apiMovie:MoviesService) { }


  addFavMovie(favMovies:any,movieToAdd:any):IFav[] 
  {
    let isDuplicated: boolean = favMovies.some(
      (movie: IFav) => movie.idMovie === movieToAdd.idMovie
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

  getFavMovies(favMovies:any,user:any):IFav[]
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
