import { Component,OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AnimationOptions } from 'ngx-lottie';
import { Observable } from 'rxjs';
import { startCardsRevealed } from 'src/app/state/actions/board.action';
import { AppState } from 'src/app/state/app.state';
import { selectIsCardsRevealedSelector } from 'src/app/state/selectors/board.selector';
import { selectIsCardsSelectedSelector } from 'src/app/state/selectors/room.selector';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  options: AnimationOptions = {
    path: '../../../../../assets/animations/Loading.json',
  };

  isCardsSelected$: Observable<boolean>;
  isCardsRevealed$: Observable<boolean>;

  statusReveal: boolean = false;
  enableNewVotation: boolean = false

  role: string | null;

  constructor(private store: Store<AppState>) {
    this.isCardsSelected$ = new Observable<boolean>();
    this.isCardsRevealed$ = new Observable<boolean>();
    this.role = sessionStorage.getItem('role');
  }

  ngOnInit(): void {
    this.isCardsSelected$ = this.store.select(selectIsCardsSelectedSelector);
    this.isCardsRevealed$ = this.store.select(selectIsCardsRevealedSelector);
  }

  revealCards() {
    this.store.dispatch(startCardsRevealed())
    this.statusReveal = true
    setTimeout(() => {
      this.statusReveal = false;
      this.enableNewVotation = true
    }, 3000)

  }

  newVotation(){
    window.location.reload();
  }



}
