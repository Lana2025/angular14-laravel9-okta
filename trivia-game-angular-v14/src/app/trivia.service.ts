import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


const TRIVIA_ENDPOINT: string = 'http://localhost:8000/question';

@Injectable({
    providedIn: 'root'
})
export class TriviaService {

    constructor(private http: HttpClient) { }

    getQuestion() {
        return this.http.get(TRIVIA_ENDPOINT)        
        .pipe(map((res: any) =>res[0]));       
    }
}
