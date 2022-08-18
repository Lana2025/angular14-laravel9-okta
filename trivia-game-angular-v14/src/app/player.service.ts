import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError  } from "rxjs";
import { map, catchError } from 'rxjs/operators';






 

export interface Player {
    id: Number,
    name: String,
    answers: Number,
    points: number,
    isUpdating: boolean
}

const API_URL: string = 'http://localhost:8000';



@Injectable({
  providedIn: 'root'
})
export class PlayerService {

    private accessToken;
    private headers;

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
     }

    constructor(private oktaAuth: OktaAuthService, private http:  HttpClient) {
        this.init();       
          
    }

    async init() {
        this.accessToken = await this.oktaAuth.getAccessToken();
        this.headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.accessToken
        });
    }

    getPlayers(): Observable<Player[]> {
        return this.http.get(API_URL + '/players',
        this.httpOptions) 
        .pipe(map(res => {
            let modifiedResult = JSON.parse(JSON.stringify(res)).data
                  modifiedResult = modifiedResult.map(function(player) {
              player.isUpdating = false;
              return player;
              
            });
            return modifiedResult;
          }));
      }

     

    addPlayer(player): Observable<Player> {
        return this.http.post<Player>(API_URL + '/api/players', player,
        this.httpOptions)       
   .pipe(
     catchError(this.errorHandler)
   )
 }
 
 find(id): Observable<Player> {
    return this.http.get<Player>(API_URL + '/api/players/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  update(id, player): Observable<Player> {
    return this.http.put<Player>(API_URL + '/api/players/' + id, player, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
    deletePlayer(id): Observable<any>  {
        return this.http.delete(API_URL + '/api/players/' + id, this.httpOptions)
   
    }
    answer(id, data): Observable<Player> {
        return this.http.post<Player>(API_URL + '/api/players/' + id+ '/answers', data,
        this.httpOptions)        
        .pipe(
            catchError(this.errorHandler)
          )
    }
    errorHandler(error) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
          errorMessage = error.error.message;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
      }
}