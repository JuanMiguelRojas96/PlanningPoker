import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomComponent } from './room.component';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('RoomComponent', () => {
  let component: RoomComponent;
  let fixture: ComponentFixture<RoomComponent>;
  let store: Store <AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomComponent ],
      imports: [StoreModule.forRoot({})],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create room', () => {
    expect(component).toBeTruthy();
  });

  it('should set profile name correctly', () => {
    const name = 'Test Name';
    const expectedProfileName = name.substring(0, 2).toUpperCase();
    const profileProps = component.setProfileName(name);
    expect(profileProps.name).toEqual(expectedProfileName);
  });

  it('should get name from store', () => {
    const testName = 'Test Input Value';
    component.updatePlayerName(testName);
    expect(component.cards[6].name).toEqual(testName);
  });

  it('should render top cards correctly', () => {
    const topCards = fixture.nativeElement.querySelectorAll('.room__top app-card');
    expect(topCards.length).toBe(component.topCards.length);
  });

  it('should render left cards correctly', () => {
    const leftCards = fixture.nativeElement.querySelectorAll('.room__left app-card');
    expect(leftCards.length).toBe(component.leftCards.length);
  });

  it('should render right cards correctly', () => {
    const rightCards = fixture.nativeElement.querySelectorAll('.room__right app-card');
    expect(rightCards.length).toBe(component.rightCards.length);
  });

  it('should render bottom cards correctly', () => {
    const bottomCards = fixture.nativeElement.querySelectorAll('.room__bottom app-card');
    expect(bottomCards.length).toBe(component.bottomCards.length);
  });

  it('should handle setProfileName function with empty string', () => {
    const profileProps = component.setProfileName('');
    expect(profileProps.name).toEqual('');
  });

  it('should handle getName function with null name from store', () => {
    component.cards[6].name = '';
    const testName = 'Test Input Value';
    component.updatePlayerName(testName);
    expect(component.cards[6].name).toEqual(testName);
  });

  it('should set type correctly based on sessionStorage data', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify({ selectedRole: 'Player' }));
    component.getType();
    expect(component.cards[6].type).toEqual('Player');
  });

  it('should call getType on ngDoCheck', () => {
    spyOn(component, 'getType');
    component.ngDoCheck();
    expect(component.getType).toHaveBeenCalled();
  });

  it('should render top cards correctly based on screen size', () => {
    component.isSmallScreen = true;
    fixture.detectChanges();
    const topCards = fixture.nativeElement.querySelectorAll('.room__top app-card');
    expect(topCards.length).toBe(1);
  });

  it('should subscribe to observables on initialization', () => {
    expect(component.subscriptions.length).toBeGreaterThan(0);
  });

  it('should handle selected card text', () => {
    component.cards[6].selected = true;
    fixture.detectChanges();
    expect(component.cards[6].selected).toBeTrue();
  });

  it('should select cards randomly', () => {
    spyOn(component, 'selectCardsRandomly').and.callThrough();
    component.getCardsSpecter();
    setTimeout(() => {
      expect(component.selectCardsRandomly).toHaveBeenCalled();
    },3100)
  });

  it('should dispatch card texts', () => {
    spyOn(component, 'dispatchCardTexts').and.callThrough();
    component.isCardsRevealed$ = of(true);
    component.setValueCards(component.cards[0], 0);
    expect(component.dispatchCardTexts).toHaveBeenCalled();
  });

  it('should handle selected card text and reveal cards', () => {
    spyOn(component, 'selectCardsRandomly').and.callThrough();
    component.isCardsRevealed$ = of(true);
    component.handleSelectedCardText('Test Card Text');
    expect(component.cards[6].selected).toBeTrue();
    expect(component.selectCardsRandomly).toHaveBeenCalled();
  });

  it('should handle selected card text and not reveal cards', () => {
    spyOn(component, 'selectCardsRandomly').and.callThrough();
    component.isCardsRevealed$ = of(true);
    component.handleSelectedCardText(null);
    expect(component.cards[6].selected).toBeFalse();
    expect(component.selectCardsRandomly).not.toHaveBeenCalled();
  });

});
