import { IFav, IPopup, IUser } from './Interfaces';

export class User implements IUser {
  id?: number | null = null;
  userName?: string = '';
  email: string = '';
  password: string = '';
  isSubscribed: boolean | null = null;

  constructor(user?: any) {
    this.id = user == undefined ? null : user.id;
    this.userName = user == undefined ? '' : user.userName;
    this.email = user == undefined ? '' : user.email;
    this.password = user == undefined ? '' : user.password;
    this.isSubscribed = user == undefined ? null : user.isSubscribed;
  }
}
export class Popup implements IPopup {
  title: string | number;
  body: string | number;

  constructor(data?: any) {
    this.title = data == undefined ? null : data.tittle;
    this.body = data == undefined ? null : data.body;
  }
}

export class Fav implements IFav
{
  id?: number | null;
  idUser?: number | null;
  idMovie?: number;
  poster_path: string;
  keyYoutube: string;
  overview: string;
  title: string;

  constructor(fav?:any)
  {
   this.id = fav == undefined ? null: fav.id;
   this.idUser = fav == undefined ? null: fav.idUser;
   this.idMovie = fav == undefined ? null: fav.idMovie;
   this.poster_path = fav == undefined ? '' : fav.poster_path;
   this.keyYoutube = fav == undefined ? '': fav.keyYoutube;
   this.overview = fav == undefined ? '': fav.overview;
   this.title = fav == undefined ? '': fav.title;

  }


}
