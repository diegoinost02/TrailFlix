export interface IUser {
    id?: number | null;
    userName?: string;
    email: string;
    password: string;
    isSubscribed : boolean | null;
}