import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageDeckComponent } from './average-deck.component';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectTextCardsSelectedSelector } from 'src/app/state/selectors/room.selector';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AverageDeckComponent', () => {
  let component: AverageDeckComponent;
  let fixture: ComponentFixture<AverageDeckComponent>;
  let store: Store<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageDeckComponent ],
      imports: [StoreModule.forRoot({})],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageDeckComponent);
    store = TestBed.inject(Store);
    component = fixture.componentInstance;

    spyOn(store, 'select').and.callFake((selector: any) => {
      if (selector === selectTextCardsSelectedSelector) {
        return of(['3', '4', '5', 'NaN', '1']);
      }
      return of([]);
    });

    spyOn(component, 'getTextsCardsSelected').and.callThrough();
    spyOn(component, 'getAverage').and.callThrough();

    fixture.detectChanges();

  });

  it('should create average-deck', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTextsCardsSelected on initialization', () => {
    expect(component.getTextsCardsSelected).toHaveBeenCalled();
  });

  it('should call getAverage on initialization', () => {
    expect(component.getAverage).toHaveBeenCalled();
  });

  it('should calculate average correctly', () => {
    component.textCardsSelected$ = of(['3', '4', '5', 'NaN', '1']);
    component.getAverage();
    expect(component.average).toBe(3.25);
  });

  it('should handle NaN values in textCardsSelected', () => {
    const NaNIndex = component.cards.findIndex(card => card.text === 'NaN');
    expect(NaNIndex).toBe(-1); // 'NaN' no debería estar en las cartas
  });



  it('should handle empty textCardsSelected', () => {
    component.textCardsSelected$ = of([]);
    component.ngOnInit();
    expect(component.cards.length).toBe(0);
  });


});
