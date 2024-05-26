import { Component, HostListener, OnInit } from '@angular/core';
import { CardProps } from '../../atoms/card/card.component';
import { Observable, Subscription} from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectInputValueSelector } from 'src/app/state/selectors/input.selector';
import {selectCardTextSelector, selectDeckTextsSelector} from 'src/app/state/selectors/deck.selector';
import { ProfileProps } from '../../atoms/profile/profile.component';
import { cardsSelected, textCardsSelected } from 'src/app/state/actions/room.action';
import { selectIsCardsRevealedSelector } from 'src/app/state/selectors/board.selector';
import { selectTextCardsSelectedSelector } from 'src/app/state/selectors/room.selector';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  name$: Observable<string> = new Observable<string>();
  deckTexts$: Observable<string[]> = new Observable<string[]>();
  isCardsRevealed$: Observable<boolean> = new Observable<boolean>();
  selectedCardText$: Observable<string | null> = new Observable<string | null>();
  textCardsSelected$: Observable<string[]> = new Observable<string[]>();

  deckTexts: string[] = [];
  subscriptions: Subscription[] = [];

  isSmallScreen = window.innerWidth <= 768;
  previousType: string | null = null;
  cardsRandomlyFlag: boolean = false;

  cards: CardProps[] = [
    { text: '', name: 'Oscar', width: '2.188rem', height: '3.75rem', type: 'Player', selected: false },
    { text: '', name: 'David', width: '2.188rem', height: '3.75rem', type: 'Specter', selected: false },
    { text: '', name: 'Albert', width: '2.188rem', height: '3.75rem', type: 'Player', selected: false },
    { text: '', name: 'Vale', width: '2.188rem', height: '3.75rem', type: 'Player', selected: false },
    { text: '', name: 'Pedro', width: '2.188rem', height: '3.75rem', type: 'Player', selected: false },
    { text: '', name: 'Carlos', width: '2.188rem', height: '3.75rem', type: 'Player', selected: false },
    { text: '', name: '', width: '2.188rem', height: '3.75rem', type: '', selected: false },
    { text: '', name: 'Nata', width: '2.188rem', height: '3.75rem', type: 'Player', selected: false },
  ];

  profileProps: ProfileProps = {
    width: '56px',
    height: '56px',
    fontSize: '16px',
    name: '',
  };

  constructor(private store: Store<AppState>) {
    this.name$ = this.store.select(selectInputValueSelector);
    this.deckTexts$ = this.store.select(selectDeckTextsSelector);
    this.isCardsRevealed$ = this.store.select(selectIsCardsRevealedSelector);
    this.selectedCardText$ = this.store.select(selectCardTextSelector);
    this.textCardsSelected$ = this.store.select(selectTextCardsSelectedSelector);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isSmallScreen = window.innerWidth <= 768;
  }

  ngOnInit() {
    this.initializeSubscriptions();
    this.getDeckTexts();
  }

  ngDoCheck() {
    this.getType();
  }

  initializeSubscriptions() {
    const nameSub = this.name$.subscribe((name) => this.updatePlayerName(name));
    const selectedCardTextSub = this.selectedCardText$.subscribe((text) =>
      this.handleSelectedCardText(text)
    );
    this.subscriptions.push(nameSub, selectedCardTextSub);
  }

  updatePlayerName(name: string) {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      this.cards[6].name = parsedData.name;
    }else{
      this.cards[6].name = name;
      this.getType();
    }
  }

  setProfileName(name: string) {
    this.profileProps.name = name.substring(0, 2).toUpperCase();
    return this.profileProps;
  }

  handleSelectedCardText(value: string | null) {
    const revealedCardsSub = this.isCardsRevealed$.subscribe((isRevealed) => {
      if (isRevealed) {
        setTimeout(() => {
          this.cards[6].text = value ?? '';
          this.cards[6].selected = false;
        }, 3000);
      }
      if (value) {
        this.cards[6].selected = true;
        this.selectCardsRandomly();
      }
    });
    this.subscriptions.push(revealedCardsSub);

  }

  getDeckTexts() {
    const deckTextSub = this.deckTexts$.subscribe(
      (texts) => (this.deckTexts = texts)
    );
    this.subscriptions.push(deckTextSub);
  }

  setValueCards(card: CardProps, index: number): void {
    const revealedCardsSub = this.isCardsRevealed$.subscribe(isRevealCards => {
      if (isRevealCards) {
        setTimeout(() => {
          const randomText = this.deckTexts[Math.floor(Math.random() * this.deckTexts.length)];
          card.text = randomText;
          card.selected = false;
        }, 3000);
          this.dispatchCardTexts();
      }
    });
    this.subscriptions.push(revealedCardsSub);
  }

  selectCardsRandomly() {
    if (!this.cardsRandomlyFlag) {
      this.cardsRandomlyFlag = true;
      const promises = this.cards.map((card, index) => {

        if (index === 6) {
          return Promise.resolve();
        }

        return new Promise<void>((resolve) => {
          const randomDelay = Math.floor(Math.random() * 3000) + 1000;
          setTimeout(() => {
            this.cards[index].selected = true;
            resolve();
          }, randomDelay);

          this.setValueCards(card, index);
        });

      });
      Promise.all(promises).then(() => {
        this.store.dispatch(
          cardsSelected({ isCardsSelected: { isCardsSelected: true } })
        );
      });
    }

  }

  dispatchCardTexts() {
    setTimeout(() => {
      const cardTexts = this.cards
      .filter(card => card.type === 'Player')
      .map(card => card.text);
    this.store.dispatch(textCardsSelected({ textCardsSelected: cardTexts }));
    },3000)
  }

  getUserData(): { selectedRole: string } | null {
    const userData = sessionStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  getCardsSpecter() {
    const userData = this.getUserData();
    if (userData?.selectedRole === 'Specter') {
      setTimeout(() => {
        this.selectCardsRandomly();
      }, 3000);
    }
  }

  getType() {
    const userData = this.getUserData();
    if (userData) {
      const currentType = userData.selectedRole;
      if (this.previousType !== currentType) {
        this.cards[6].type = currentType;
        this.previousType = currentType;
        this.getCardsSpecter();
      }
    }
  }

  get topCards() {
    return this.isSmallScreen ? this.cards.slice(1, 2) : this.cards.slice(0, 3);
  }

  get leftCards() {
    return this.isSmallScreen
      ? [this.cards[5], this.cards[4], this.cards[7]]
      : this.cards.slice(3, 4);
  }

  get rightCards() {
    return this.isSmallScreen
      ? [this.cards[2], this.cards[3], this.cards[0]]
      : this.cards.slice(4, 5);
  }

  get bottomCards() {
    return this.isSmallScreen ? this.cards.slice(6, 7) : this.cards.slice(5, 8);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
