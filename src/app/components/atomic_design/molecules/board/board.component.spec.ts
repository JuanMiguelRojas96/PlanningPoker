import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectCardTextSelector } from 'src/app/state/selectors/deck.selector';
import { of } from 'rxjs';
import { startCardsRevealed } from 'src/app/state/actions/board.action';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let store: Store<AppState>;
  let buttonElement: HTMLElement;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardComponent ],
      imports: [StoreModule.forRoot({})]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    spyOn(store, 'select').and.callFake((selector: any) => {
      if (selector === selectCardTextSelector) {
        return of('Test Card Text');
      }
      return of(null);
    });

    fixture.detectChanges();
  });


  it('should create board', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch startCardsRevealed action on revealCards', () => {
    component.revealCards();
    expect(dispatchSpy).toHaveBeenCalledWith(startCardsRevealed());
  });

  it('should set statusReveal to true after calling revealCards', () => {
    component.revealCards();
    expect(component.statusReveal).toBeTrue();
  });


  it('should set statusReveal to false after 3 seconds', fakeAsync(() => {
    component.revealCards();
    tick(3000);
    expect(component.statusReveal).toBeFalse();
  }));


});
