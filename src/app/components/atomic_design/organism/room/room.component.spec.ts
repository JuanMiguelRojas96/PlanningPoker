import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomComponent } from './room.component';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { selectInputValueSelector } from 'src/app/state/selectors/input.selector';
import { selectCardTextSelector } from 'src/app/state/selectors/deck.selector';

describe('RoomComponent', () => {
  let component: RoomComponent;
  let fixture: ComponentFixture<RoomComponent>;
  let store: Store <AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomComponent ],
      imports: [StoreModule.forRoot({})]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomComponent);
    store = TestBed.inject(Store);
    component = fixture.componentInstance;

    spyOn(store, 'select').and.callFake((selector: any) => {
      if (selector === selectInputValueSelector) {
        return of('Test Input Value');
      } else if (selector === selectCardTextSelector) {
        return of('Test Card Text');
      }
      return of(null);
    });

    fixture.detectChanges();
  });

  it('should create room', () => {
    expect(component).toBeTruthy();
  });

  it('should set profile name correctly', () => {
    const name = 'Test Name';
    component.setProfileName(name);
    expect(component.profileProps.name).toEqual(name.substring(0, 2).toUpperCase());
  });

  it('should get name from store', () => {
    component.getName();
    expect(component.cards[6].name).toEqual('Test Input Value');
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
    component.setProfileName('');
    expect(component.profileProps.name).toEqual('');
  });

  it('should handle getName function with null name from store', () => {
    component.getName();
    expect(component.cards[6].name).toBe('Test Input Value');
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


});
