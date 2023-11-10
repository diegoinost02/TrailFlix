import { IPopup, IUser } from "./Interfaces";

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
export class Popup implements IPopup{
    title: string;
    body: string;

    constructor(data?: any){
        this.title = data == undefined ? null : data.tittle
        this.body = data == undefined ? null : data.body
    }
}