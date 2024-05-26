import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: Store<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [StoreModule.forRoot({})],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create header', () => {
    expect(component).toBeTruthy();
  });

  it('should get the name of the game from sessionStorage', () => {
    expect(component.getName)
    expect(component.nameGame).toEqual('Planning Poker');
  });

  it('should get the name of the game from sessionStorage when it exists', () => {
    spyOn(sessionStorage, 'getItem').withArgs('nameGame').and.returnValue('Custom Game Name');

    component.getNameGame();

    expect(component.nameGame).toEqual('Custom Game Name');
  });

  it('should get the default name of the game when it does not exist in sessionStorage', () => {
    spyOn(sessionStorage, 'getItem').withArgs('nameGame').and.returnValue(null);

    component.getNameGame();

    expect(component.nameGame).toEqual('Planning Poker');
  });

  it('should get the user name from sessionStorage when it exists', () => {
    spyOn(sessionStorage, 'getItem').withArgs('userData').and.returnValue('{"name": "John Doe"}');

    component.getName();

    expect(component.profileProps.name).toEqual('JO');
  });


  it('should emit button click event when onClickInvite is called', () => {
    spyOn(component.buttonClick, 'emit');

    component.onClickInvite();

    expect(component.buttonClick.emit).toHaveBeenCalled();
  });

});
