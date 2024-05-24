import { Component, OnInit } from '@angular/core';
import { CardProps } from '../../atoms/card/card.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectTextCardsSelectedSelector } from 'src/app/state/selectors/room.selector';

@Component({
  selector: 'app-average-deck',
  templateUrl: './average-deck.component.html',
  styleUrls: ['./average-deck.component.scss']
})
export class AverageDeckComponent implements OnInit {

  textCardsSelected$: Observable<string[]> = new Observable<string[]>();

  cards: CardProps[] = []

  average: number = 0;

  constructor(private store: Store<AppState>) {
    this.textCardsSelected$ = this.store.select(selectTextCardsSelectedSelector);
  }

  ngOnInit(): void {
    this.getTextsCardsSelected();
    this.getAverage();
  }

  getAverage() {
    this.textCardsSelected$.subscribe((textCardsSelected) => {
      const numbers = textCardsSelected.filter(val => !isNaN(parseInt(val))).map(val => parseInt(val));

      const sum = numbers.reduce((acc, val) => acc + val, 0);

      const count = numbers.length;

      const average = count > 0 ? sum / count : 0;

      this.average = parseFloat(average.toFixed(2));

    });
  }


  getTextsCardsSelected() {
    this.textCardsSelected$.subscribe((textCardsSelected) => {
      const countMap = new Map();

      textCardsSelected.forEach((number) => {
        countMap.set(number, (countMap.get(number) || 0) + 1);
      });

      this.cards = Array.from(countMap.entries()).map(([number, count]) => {
        return {
          text: number,
          name: count + (count === 1 ? ' voto' : ' votos'),
          width: '53px',
          height: '86px'
        };
      });
    });
  }
}

