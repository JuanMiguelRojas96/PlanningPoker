import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGameComponent } from './create-game.component';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { of } from 'rxjs';
import { setLabelValue } from 'src/app/state/actions/input.actions';
import { setButtonValue } from 'src/app/state/actions/button.action';
import { selectInputValueSelector } from 'src/app/state/selectors/input.selector';

describe('CreateGameComponent', () => {
  let component: CreateGameComponent;
  let fixture: ComponentFixture<CreateGameComponent>;
  let store: Store<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGameComponent ],
      imports: [StoreModule.forRoot({})],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGameComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();

    spyOn(store, 'select').and.callFake((selector:any) => {
      if (selector === selectInputValueSelector) {
        return of('Test Input');
      }
      return of(false);
    });
    fixture.detectChanges();
  });

  it('should create create-game', () => {
    expect(component).toBeTruthy();
  });


  it('should dispatch setLabelValue with correct label', () => {
    const labelValue = 'Nombra la partida';
    component.setLabelInput(labelValue);
    expect(store.dispatch).toHaveBeenCalledWith(setLabelValue({ newLabel: { label: labelValue } }));
  });

  it('should dispatch setButtonValue with correct button text', () => {
    const buttonText = 'Crear partida';
    component.setButtonText(buttonText);
    expect(store.dispatch).toHaveBeenCalledWith(setButtonValue({ newButton: { buttonText: buttonText } }));
  });




  it('should render component and text when isLoading$ is false', () => {
    const createGameElement: HTMLElement = fixture.nativeElement.querySelector('.create-game');
    expect(createGameElement).toBeTruthy();
  });

  it('should not render component and text when isLoading$ is true', () => {
    fixture.detectChanges();
    const createGameElement: HTMLElement = fixture.nativeElement.querySelector('.create-game');
    expect(!createGameElement).toBeFalsy();
  });





});
