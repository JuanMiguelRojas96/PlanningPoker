import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { of } from 'rxjs';

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
    store = TestBed.inject(Store);

    spyOn(sessionStorage, 'getItem').and.returnValue('Planning Poker');

    spyOn(store, 'select').and.returnValue(of('Some Value'));

    spyOn(component.inputValue$, 'subscribe').and.callThrough();

    fixture.detectChanges();
  });



  it('should create header', () => {
    expect(component).toBeTruthy();
  });

  it('should get the name of the game from sessionStorage', () => {
    expect(component.getName)
    expect(component.nameGame).toEqual('Planning Poker');
  });

});
