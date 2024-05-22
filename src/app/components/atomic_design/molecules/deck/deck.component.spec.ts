import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckComponent } from './deck.component';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { CardProps } from '../../atoms/card/card.component';
import { selectCard } from 'src/app/state/actions/deck.action';

describe('DeckComponent', () => {
  let component: DeckComponent;
  let fixture: ComponentFixture<DeckComponent>;
  let store: Store<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckComponent ],
      imports: [StoreModule.forRoot({})]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch');

    spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify({ selectedRole: 'Player' }));

    spyOn(component, 'onCardSelected').and.callThrough();

    fixture.detectChanges();
  });

  it('should create deck', () => {
    expect(component).toBeTruthy();
  });

  it('should display the component content when typeUser is "Player"', () => {
    const deckElement: HTMLElement = fixture.nativeElement.querySelector('.deck');
    expect(deckElement).toBeTruthy();

    const titleElement: HTMLElement = fixture.nativeElement.querySelector('.deck__title');
    expect(titleElement.textContent).toContain('Elige una carta');
  });

  it('should display cards and call onCardSelected when a card is selected', () => {
    const cards: CardProps[] = component.cards;

    cards.forEach((card, index) => {
      const cardComponent: HTMLElement = fixture.nativeElement.querySelector(`.deck__container-card:nth-child(${index + 1})`);
      expect(cardComponent).toBeTruthy();

      cardComponent.dispatchEvent(new Event('cardSelected'));
      fixture.detectChanges();

      expect(component.selectedCardIndex).toEqual(index);

      expect(component.onCardSelected).toHaveBeenCalledWith(index);

      const expectedAction = selectCard({ cardText: { selectedCardText: card.text } });
      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });

});
