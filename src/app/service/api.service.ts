import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Users} from './users';
import {Repositories} from './repo';

const httpOptions = {
  headers : new HttpHeaders({'Content-Type': 'application/json'})
}
const apiUrl = "https://api.github.com";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /**
   * @ngDoc
   * @name : getUsers
   * @description : this is an api call to get all the users
   */
  public getUsers (name: string) : Observable<Users>{
    const url = `${apiUrl}/search/users?q=${name}`;
    return this.http.get<Users>(url)
    .pipe(
      tap(heroes => console.log("fetched user")),
      catchError(this.handleError('getUsers', {}))
    );
  }

  /**
   * @ngDoc
   * @name : getUsers
   * @description : this is an api call to get selected user info
   */
  public getUser(name: string): Observable<Users> {
    const url = `${apiUrl}/users/${name}`;
    return this.http.get<Users>(url).pipe(
      tap(_ => console.log(`fetched User name=${name}`)),
      catchError(this.handleError<Users>(`getUser name=${name}`))
    );
  }

  /**
   * @ngDoc
   * @name : getRepoList
   * @description : this is an api call to get repository list for the selected user
   */
  public getRepoList(name: string): Observable<Repositories> {
    const url = `${name}`;
    return this.http.get<Repositories>(url).pipe(
      tap(_ => console.log(`fetched User name=${name}`)),
      catchError(this.handleError<Repositories>(`getUser name=${name}`))
    );
  }

  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
