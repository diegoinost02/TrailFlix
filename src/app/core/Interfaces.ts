export interface IUser {
    id?: number | null;
    userName?: string;
    email: string;
    password: string;
    isSubscribed : boolean | null;
}

export interface IFav{

    id?:number | null;
    idUser?:number| null;
    idMovie?:string;
    linkPoster:string;
    keyYoutube:string;
    overview:string;
}

export interface IPopup{
    title: string;
    body: string;
}