import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WebStorageService {

    constructor(
    private http: HttpClient
    ) { }

    public get(key: string): string | null { //this will either return an string or it will return null and this service gets an string as the key 
        return window.localStorage.getItem(key);
    }

    public set(key: string, value: string): void { // here we are accessing the local storage and then we have two methods , get and set , the local storage is an persistant storage , which means that it will stay even if we close the browser or reload it 
        // that storage can be 5-10 mbs and it is generally in the form of key value pairs 
        window.localStorage.setItem(key, value);
    }
// these are normal methods which are for the normal backend
    public getRemote(): Observable<string> {
        return this.http.get<string>('/mock/api/filter');
    }

    public setRemote(payload: string): Observable<string> {
        return this.http.put<string>('/mock/api/filter', payload);
    }
}
