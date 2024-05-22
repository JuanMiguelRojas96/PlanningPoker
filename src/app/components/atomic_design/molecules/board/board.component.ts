import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { selectCardTextSelector } from 'src/app/state/selectors/deck.selector';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  selectedCardText$: Observable<string | null>;

  constructor(private store: Store<AppState>) {
    this.selectedCardText$ = new Observable<string | null>();
  }

  ngOnInit(): void {
    this.selectedCardText$ = this.store.select(selectCardTextSelector);
  }

}
