import { Component, HostListener, OnInit} from '@angular/core';
import { CardProps } from '../../atoms/card/card.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectInputValueSelector } from 'src/app/state/selectors/input.selector';
import { selectCardTextSelector } from 'src/app/state/selectors/deck.selector';
import { ProfileProps } from '../../atoms/profile/profile.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  name$: Observable<string>;
  selectedCardText$: Observable<string | null>;

  cards: CardProps[] = [
    {text: '',name: 'Oscar' ,width: '2.188rem', height: '3.75rem',type: 'Player' ,selected: false},
    {text: '',name: 'David' ,width: '2.188rem', height: '3.75rem',type: 'Specter' ,selected: false},
    {text: '',name: 'Albert' ,width: '2.188rem', height: '3.75rem',type: 'Player' ,selected: false},
    {text: '',name: 'Vale' ,width: '2.188rem', height: '3.75rem',type: 'Player' ,selected: false},
    {text: '',name: 'Pedro' ,width: '2.188rem', height: '3.75rem',type: 'Player' ,selected: false},
    {text: '',name: 'Carlos' ,width: '2.188rem', height: '3.75rem',type: 'Player' ,selected: false},
    {text: '' ,name: '' ,width: '2.188rem', height: '3.75rem',type: '' ,selected: false},
    {text: '',name: 'Nata' ,width: '2.188rem', height: '3.75rem',type: 'Player' ,selected: false},
  ];

  profileProps: ProfileProps = {
    width: '56px',
    height: '56px',
    fontSize: '16px',
    name: ''
  }

  isSmallScreen = window.innerWidth <= 768;



  constructor(private store: Store<AppState>) {
    this.name$ = new Observable<string>();
    this.selectedCardText$ = new Observable<string | null>();
   }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isSmallScreen = window.innerWidth <= 768;
  }

  ngOnInit() {
    this.name$ = this.store.select(selectInputValueSelector);
    this.selectedCardText$ = this.store.select(selectCardTextSelector);
    this.getName();
    this.getSelectedCardText();
  }

  ngDoCheck() {
    this.getType();
  }

  setProfileName(name: string) {
    this.profileProps.name = name.substring(0, 2).toUpperCase();
    return this.profileProps
  }


  getName(){
    this.name$.subscribe((value) => {
      this.cards[6].name = value;
      this.getType();
    })
  }

  getSelectedCardText(){
    this.selectedCardText$.subscribe((value) => {
      this.cards[6].text = value ?? '';
      if (value) {
        this.cards[6].selected = true;
      }
    })
  }

  getType() {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      this.cards[6].type = parsedData.selectedRole;
    }
  }

  get topCards() {
    return this.isSmallScreen ? this.cards.slice(1, 2) : this.cards.slice(0, 3);
  }

  get leftCards() {
    return this.isSmallScreen ? [this.cards[5], this.cards[4], this.cards[7]] : this.cards.slice(3, 4);
  }

  get rightCards() {
    return this.isSmallScreen ? [this.cards[2], this.cards[3], this.cards[0]] : this.cards.slice(4, 5);
  }

  get bottomCards() {
    return this.isSmallScreen ? this.cards.slice(6, 7) : this.cards.slice(5, 8);
  }


}
