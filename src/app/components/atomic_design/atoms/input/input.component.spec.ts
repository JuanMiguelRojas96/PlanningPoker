import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectInputLabelSelector, selectInputValueSelector, selectIsInputValidSelector } from 'src/app/state/selectors/input.selector';
import { of } from 'rxjs';
import { setInputValue, setLabelValue } from 'src/app/state/actions/input.actions';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let store: Store<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputComponent ],
      imports: [ StoreModule.forRoot({}) ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'select').and.callFake((selector:any) => {
      if (selector === selectInputLabelSelector) {
        return of('Test Label');
      }
      if (selector === selectInputValueSelector) {
        return of('Test Input');
      }
      if (selector === selectIsInputValidSelector) {
        return of(true);
      }
      return of();
    });
    spyOn(store, 'dispatch').and.callThrough();

    fixture.detectChanges();
  });

  it('should create input', () => {
    expect(component).toBeTruthy();
  });

  it('should select label$ from the store', () => {
    component.ngOnInit();
    component.label$.subscribe((value) => {
      expect(value).toBe('Test Label');
    });
  });

  it('should select inputValue$ from the store', () => {
    component.ngOnInit();
    component.inputValue$.subscribe((value) => {
      expect(value).toBe('Test Input');
    });
  });

  it('should select isInputValid$ from the store', () => {
    component.ngOnInit();
    component.isInputValid$.subscribe((value) => {
      expect(value).toBe(true);
    });
  });


  it('should dispatch setInputValue action when onInputValueChange is called', () => {
    const newValue = 'New Test Input';
    const event = {
      target: {
        value: newValue
      }
    } as unknown as Event;
    component.onInputValueChange(event);
    expect(store.dispatch).toHaveBeenCalledWith(setInputValue({ newInput: { inputValue: newValue } }));
  });


  it('should dispatch setLabelValue action when setLabel is called', () => {
    const newLabel = 'New Test Label';
    component.setLabel(newLabel);
    expect(store.dispatch).toHaveBeenCalledWith(setLabelValue({ newLabel: { label: newLabel } }));
  });

  it('should display label text from label$ in the DOM', () => {
    const labelElement: HTMLLabelElement = fixture.nativeElement.querySelector('.input__label');
    expect(labelElement.textContent).toBe('Test Label');
  });

  it('should display input value from inputValue$ in the input element', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('.input__input');
    expect(inputElement.value).toBe('Test Input');
  });

});
