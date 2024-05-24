import { Component, OnInit } from '@angular/core';
import { CardProps } from '../../atoms/card/card.component';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { selectCard, setDeckTexts } from 'src/app/state/actions/deck.action';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit{

  cards: CardProps[] = [
    { text: '0', width: '53px', height: '86px'},
    {text: '1', width: '53px', height: '86px'},
    {text: '3', width: '53px', height: '86px'},
    {text: '5', width: '53px', height: '86px'},
    {text: '8', width: '53px', height: '86px'},
    {text: '13', width: '53px', height: '86px'},
    {text: '21', width: '53px', height: '86px'},
    {text: '34', width: '53px', height: '86px'},
    {text: '55', width: '53px', height: '86px'},
    {text: '89', width: '53px', height: '86px'},
    {text: '?', width: '53px', height: '86px'},
    {text: '☕️', width: '53px', height: '86px'},
  ]

  selectedCardIndex: number | null = null;
  typeUser: string | null = null;

  constructor(private store: Store<AppState>) { }

  ngOnInit(){
    this.dispatchCardTexts();
  }


  ngDoCheck() {
    this.getType();
  }

  onCardSelected(index: number) {
    this.selectedCardIndex = index;

    const selectedCard = this.cards[index];
    this.store.dispatch(selectCard({ cardText: {selectedCardText: selectedCard.text} }));
  }

  getType() {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      this.typeUser = parsedData.selectedRole;
    }
  }

  dispatchCardTexts() {
    const cardTexts = this.cards.map(card => card.text);
    this.store.dispatch(setDeckTexts({deckTexts: cardTexts}));
  }

}
