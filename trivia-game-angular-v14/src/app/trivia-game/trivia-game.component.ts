import { Component, OnInit } from '@angular/core';
import { Player, PlayerService } from '../player.service';
import { TriviaService } from '../trivia.service';
import { OktaAuthService } from '@okta/okta-angular';
import 'rxjs/Rx';

@Component({
  selector: 'app-trivia-game',
  templateUrl: './trivia-game.component.html',
  styleUrls: ['./trivia-game.component.css']
})
export class TriviaGameComponent implements OnInit {

  players: Player[]= [];
  errorMessage: string;
  isLoading: boolean = true;
  question: any;

  constructor(private playerService: PlayerService,
    private triviaService: TriviaService,
    private oktaAuth: OktaAuthService) { }

    async ngOnInit() {
      await this.oktaAuth.getAccessToken();
        this.getPlayers();
        this.getQuestion();
    }
    getQuestion() {
      this.triviaService
          .getQuestion()                
          .subscribe(
            {
            
            next:question => this.question = question,
            error: error => this.errorMessage = <any>error
            });
            
  }

    getPlayers() {
        this.playerService        
            .getPlayers()
            .subscribe({
              next: players => {
                this.players = players
                this.isLoading = false 
                 
            },
              error: error => {
                this.errorMessage = <any>error
                this.isLoading = false
            }
           });
            
    }
    
  findPlayer(id): Player {
      return this.players.find(player => player.id === id);
  }
  
  isUpdating(id:any): boolean {
       return this.findPlayer(id).isUpdating;
  }
  appendPlayer(player: Player) {  
    this.players.push(player);
}
deletePlayer(id:Number) {
  let player = this.findPlayer(id)
  player.isUpdating = true
  this.playerService
      .deletePlayer(id)
      .subscribe({
        next: response => {
              let index = this.players.findIndex(player => player.id === id)
              this.players.splice(index, 1)
              player.isUpdating = false
          },
          error:error => {
              this.errorMessage = <any>error
              player.isUpdating = false
          }
        });
}
rightAnswer(id) {
  let data = {
      correct: true
  }
  this.answer(id, data)
}

wrongAnswer(id) {
  let data = {
      correct: false
  }
  this.answer(id, data)
}

answer(id, data) {
  let player = this.findPlayer(id)
  player.isUpdating = true
  this.playerService
      .answer(id, data)
      .subscribe({
        next: response => {
              player.answers = response.answers
              player.points = response.points
              player.isUpdating = false
          },
          error:error => {
              this.errorMessage = <any>error
              player.isUpdating = false
          }
        });
        
}

}
