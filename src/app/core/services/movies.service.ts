import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { Movie, PeliculasResponse } from '../InterfaceMovies';
import { Video, Videos } from '../InterfaceVideo';
import { IFav } from '../Interfaces';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  ///TMDB
  private baseURL: string = 'https://api.themoviedb.org/3';
  private PageNPlaying = 1;
  private PagePopular = 1;
  private PageSearch = 1;

  public cargando = false;
  public cargandoPopular = false;
  public cargandoVideo = false;
  public cargandoSearch = false;

  private apikey: string = '13ee2b3b1810d881d34a3d2f4351f448'; ///Buscar key nuestra
  private language: string = 'es-ES';

  ///JSON-SERVER
  private UrlJsonServer: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  ///TMDB FUNCIONES
  get paramsNPlaying() {
    return {
      api_key: this.apikey,
      language: 'es-ES',
      page: this.PageNPlaying.toString(),
    };
  }
  get paramsPopular() {
    return {
      api_key: this.apikey,
      language: 'es-ES',
      page: this.PagePopular.toString(),
    };
  }
  get paramsVideo() {
    return {
      api_key: this.apikey,
      language: 'en-EN',
    };
  }

  get paramsSearch() {
    return {
      api_key: this.apikey,
      language: 'es-ES',
      page: this.PageSearch.toString(),
    };
  }

  getPeliculas(): Observable<Movie[]> {
    console.log('cargando');
    if (this.cargando) {
      return of([]);
    }
    this.cargando = true;

    return this.http
      .get<PeliculasResponse>(`${this.baseURL}/movie/now_playing`, {
        params: this.paramsNPlaying,
      })
      .pipe(
        map((res) => res.results),
        tap(() => {
          this.PageNPlaying += 1;
          this.cargando = false;
        })
      );
  }

  getPeliculasTrendig(): Observable<Movie[]> {
    console.log('cargandoTrending');
    if (this.cargandoPopular) {
      return of([]);
    }
    this.cargandoPopular = true;

    return this.http
      .get<PeliculasResponse>(`${this.baseURL}/movie/popular`, {
        params: this.paramsPopular,
      })
      .pipe(
        map((res) => res.results),
        tap(() => {
          this.PagePopular += 1;
          this.cargandoPopular = false;
        })
      );
  }

  getVideosIdMovie(id: number): Observable<Video[]> {
    console.log('cargandoVideos');
    if (this.cargandoVideo) {
      return of([]);
    }
    this.cargandoVideo = true;

    return this.http
      .get<Videos>(`${this.baseURL}/movie/${id}/videos`, {
        params: this.paramsVideo,
      })
      .pipe(
        map((res) => res.results),
        tap(() => {
          this.cargandoVideo = false;
        })
      );
  }

  SearchMovies(texto: string): Observable<Movie[]> {
    const params = { ...this.paramsSearch, query: texto };
    console.log('CargandoSearch');
    if (this.cargandoSearch) {
      return of([]);
    }
    this.cargandoSearch = true;
    return this.http
      .get<PeliculasResponse>(`${this.baseURL}/search/movie`, {
        params,
      })
      .pipe(
        map((res) => res.results),
        tap(() => {
          this.PageSearch += 1;
          this.cargandoSearch = false;
        })
      );
  }

  resetPageHome() {
    this.PageNPlaying = 1;
    this.PagePopular = 1;
  }
  resetPageSearch() {
    this.PageSearch = 1;
  }
  ///JSON-SERVER FUNCIONES
  getFavMovies(id: number): Observable<IFav[]> {
    return this.http.get<IFav[]>(
      `${this.UrlJsonServer}/MovieFavs?idUser=${id}`
    );
  }

  putFavMovie(FavMovie: IFav) {
    return this.http.post<IFav[]>(`${this.UrlJsonServer}/MovieFavs`, FavMovie);
  }

  removeFavMovie(idMovie: number, idUser: number): Observable<boolean> {
    let favMovie: any;

    return this.getIdFavMovie(idMovie, idUser).pipe(
      switchMap((fav) => {
        favMovie = fav;

        if (favMovie && favMovie.length > 0) {
          console.log(favMovie[0].id);

          return this.http
            .delete(`${this.UrlJsonServer}/MovieFavs/${favMovie[0].id}`)
            .pipe(
              map((response) => true),
              catchError((error) => of(false))
            );
        } else {
          // No se encontró la película favorita
          return of(false);
        }
      })
    );
  }

  getIdFavMovie(idMovie: number, idUser: number): Observable<IFav[]> {
    return this.http
      .get<IFav[]>(
        `${this.UrlJsonServer}/MovieFavs?idUser=${idUser}&idMovie=${idMovie}`
      )
      .pipe();
  }
}
