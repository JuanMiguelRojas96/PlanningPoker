import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { selectIsCardsRevealedSelector } from 'src/app/state/selectors/board.selector';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  isCardsRevealed$: Observable<boolean> = new Observable<boolean>();
  isCardsRevealed: boolean = false;



  constructor(private store : Store<AppState>) {
    this.isCardsRevealed$ = this.store.select(selectIsCardsRevealedSelector);

   }

  ngOnInit(): void {
    this.getAverageDeck();
  }


  getAverageDeck(){
    this.isCardsRevealed$.subscribe((isRevealed) => {
      if (isRevealed) {
        this.isCardsRevealed = true;
      }
    })
  }


}
