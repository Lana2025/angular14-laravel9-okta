import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { Player, PlayerService } from '../player.service';
import { Router } from '@angular/router';
import 'rxjs/Rx';

@Component({
    selector: 'app-player-form',
    templateUrl: './player-form.component.html',
    styleUrls: ['./player-form.component.css']
})

export class PlayerFormComponent implements OnInit {
   
    errors: string = '';
    isLoading: boolean = false;

    constructor(private playerService: PlayerService,
        private router: Router) { }

    @Output()
    playerAdded: EventEmitter<Player> = new EventEmitter<Player>();

    ngOnInit() {
    }

    
     
    addPlayer(name:any) {
        this.isLoading = true;         
          this.playerService
            .addPlayer({                                
                name: name                               
            })
            .subscribe({
              next: player => {
                    this.isLoading = false;
                    player.isUpdating = false;
                    this.playerAdded.emit(player);                    
                    
                    
                },
                error: error => {
                    this.errors = error;
                    this.isLoading = false;
                  }
                  
                });
                
    }
}
