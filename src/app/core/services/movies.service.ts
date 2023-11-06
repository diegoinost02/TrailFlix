import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { Movie, PeliculasResponse } from '../InterfaceMovies';
import { Video, Videos } from '../InterfaceVideo';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  
  private baseURL: string = 'https://api.themoviedb.org/3';
  private PageNPlaying = 1;
  private PagePopular = 1;

  public cargando = false;
  public cargandoPopular = false;
  public cargandoVideo = false;

  private apikey: string = '13ee2b3b1810d881d34a3d2f4351f448'; ///Buscar key nuestra
  private language: string = 'es-ES';

  constructor(private http: HttpClient) {}

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

  get paramsVideo()
  {
    return {
      api_key: this.apikey,
      language: 'en-EN',
    };

  }

  

  getPeliculas():Observable<Movie[]>{
    console.log('cargando');
    if (this.cargando) {
     return of([]);
    }
       this.cargando=true;

       return this.http.get<PeliculasResponse>(`${this.baseURL}/movie/now_playing`,{params:this.paramsNPlaying}).pipe(
    
         map((res)=>res.results),
         tap(()=>{
           this.PageNPlaying+=1;
           this.cargando=false;
         })
       );
     }

     getPeliculasTrendig():Observable<Movie[]>{
      console.log('cargandoTrending');
      if (this.cargandoPopular) {
       return of([]);
      }
         this.cargandoPopular=true;
  
         return this.http.get<PeliculasResponse>(`${this.baseURL}/movie/popular`,{params:this.paramsPopular}).pipe(
           map((res)=>res.results),
           tap(()=>{
             this.PagePopular+=1;
             this.cargandoPopular=false;
           })
         );
       }

  getVideosIdMovie(id:number):Observable<Video[]>
  {
    console.log('cargandoVideos');
      if (this.cargandoVideo) {

       return of([]);
      }
         this.cargandoVideo=true;
        
         return this.http.get<Videos>(`${this.baseURL}/movie/${id}/videos`,{params:this.paramsVideo}).pipe(
           map((res)=>res.results),
           tap(()=>{
            this.cargandoVideo=false;
           })
         );
  }
  

  searchMovie() {}

  getMovieDetail() {}

  getCast() {}

  getCategory() {}

  resetPage() {}
}
