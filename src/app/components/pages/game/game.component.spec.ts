import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { of } from 'rxjs';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let store: Store<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameComponent ],
      imports: [StoreModule.forRoot({})],
    })
    .compileComponents();

  });

  beforeEach(() => {
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;


    spyOn(store, 'select').and.callThrough();
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create game', () => {
    expect(component).toBeTruthy();
  });

  it('should set isCardsRevealed to true if isCardsRevealed$ emits true', () => {
    component.isCardsRevealed$ = of(true);
    component.ngOnInit();
    expect(component.isCardsRevealed).toBeTrue();
  });

  it('should not set isCardsRevealed if isCardsRevealed$ emits false', () => {
    component.isCardsRevealed$ = of(false);
    component.ngOnInit();
    expect(component.isCardsRevealed).toBeFalse();
  });



});
