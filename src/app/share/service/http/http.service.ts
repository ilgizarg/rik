import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {UserListInterface} from "../../interface/user-list";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  readonly apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient ) { }

  getUser(): Observable<UserListInterface> {
    return this.httpClient.get<UserListInterface>(this.apiUrl).pipe(map((userList)=>{
      return userList
    }));

  }
}
