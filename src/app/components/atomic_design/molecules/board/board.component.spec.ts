import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectCardTextSelector } from 'src/app/state/selectors/deck.selector';
import { of } from 'rxjs';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let store: Store<AppState>;
  let buttonElement: HTMLElement;

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

    spyOn(store, 'select').and.callFake((selector: any) => {
      if (selector === selectCardTextSelector) {
        return of('Test Card Text');
      }
      return of(null);
    });

    fixture.detectChanges();
    buttonElement = fixture.nativeElement.querySelector('.board__zone-button');
  });


  it('should create board', () => {
    expect(component).toBeTruthy();
  });

  it('should display the button when selectedCardText$ emits a value', () => {
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.textContent).toContain('Revelar cartas');
  });

});
