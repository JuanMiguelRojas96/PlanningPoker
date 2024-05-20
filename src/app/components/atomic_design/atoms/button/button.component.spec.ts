import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectIsInputValidSelector } from 'src/app/state/selectors/input.selector';
import { selectButtonTextSelector } from 'src/app/state/selectors/button.selector';
import { of } from 'rxjs';
import { setButtonValue } from 'src/app/state/actions/button.action';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let store: Store<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ],
      imports: [StoreModule.forRoot({})],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);

    spyOn(store, 'select').and.callFake((selector:any) => {
      if (selector === selectIsInputValidSelector) {
        return of(true);
      }
      if (selector === selectButtonTextSelector) {
        return of('Test Button');
      }
      return of();
    });

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });


  it('should create button', () => {
    expect(component).toBeTruthy();
  });

  it('should select isInputValid$ from the store', () => {
    component.ngOnInit();
    component.isInputValid$.subscribe((value) => {
      expect(value).toBe(true);
    });
  });

  it('should select buttonText$ from the store', () => {
    component.ngOnInit();
    component.buttonText$.subscribe((value) => {
      expect(value).toBe('Test Button');
    });
  });

  it('should dispatch setButtonValue action when setButtonText is called', () => {
    const buttonValue = 'New Button Text';
    component.setButtonText(buttonValue);
    expect(store.dispatch).toHaveBeenCalledWith(setButtonValue({ newButton: { buttonText: buttonValue } }));
  });

  it('should disable button if isInputValid$ is false', () => {

    (store.select as jasmine.Spy).and.callFake((selector) => {
      if (selector === selectIsInputValidSelector) {
        return of(false);
      }
      return of();
    });

    fixture.detectChanges();
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('.button__container-button');
    expect(buttonElement.disabled).toBeTrue();
  });


  it('should enable button if isInputValid$ is true', () => {
    (store.select as jasmine.Spy).and.callFake((selector) => {
      if (selector === selectIsInputValidSelector) {
        return of(true);
      }
      return of();
    });
    fixture.detectChanges();
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('.button__container-button');
    expect(buttonElement.disabled).toBeTrue();
  });


});
