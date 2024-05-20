import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { FormsModule } from '@angular/forms';
import { selectInputValueSelector } from 'src/app/state/selectors/input.selector';
import { of } from 'rxjs';
import { setLabelValue } from 'src/app/state/actions/input.actions';
import { setButtonValue } from 'src/app/state/actions/button.action';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store<AppState>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [StoreModule.forRoot({}), FormsModule],
    })
    .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();

    spyOn(store, 'select').and.callFake((selector: any) => {
      if (selector === selectInputValueSelector) {
        return of('Test Input');
      }
      return of(false);
    });

    fixture.detectChanges();
  });

  it('should create login', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch setLabelValue with correct label', () => {
    const labelValue = 'Tu nombre';
    component.setLabelInput(labelValue);
    expect(store.dispatch).toHaveBeenCalledWith(setLabelValue({ newLabel: { label: labelValue } }));
  });

  it('should dispatch setButtonValue with correct button text', () => {
    const buttonText = 'Continuar';
    component.setButtonText(buttonText);
    expect(store.dispatch).toHaveBeenCalledWith(setButtonValue({ newButton: { buttonText: buttonText } }));
  });

  it('should set userData in sessionStorage on updateSessionStorage', () => {
    const expectedData = {
      inputValue: 'Test Input',
      selectedRole: 'Player',
    };
    spyOn(sessionStorage, 'setItem');
    component.updateSessionStorage();
    expect(sessionStorage.setItem).toHaveBeenCalledWith('userData', JSON.stringify(expectedData));
  });

  it('should change isLogin to false on onLogin', () => {
    component.onLogin();
    expect(component.isLogin).toBe(false);
  });

  it('should call onLogin on Enter key press', () => {
    spyOn(component, 'onLogin');
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.onKeydown(event);
    expect(component.onLogin).toHaveBeenCalled();
  });


  it('should render component and text when isLogin is true', () => {
    component.isLogin = true;
    fixture.detectChanges();
    const loginElement: HTMLElement = fixture.nativeElement.querySelector('.login');
    expect(loginElement).toBeTruthy();
  });

  it('should not render component and text when isLogin is false', () => {
    component.isLogin = false;
    fixture.detectChanges();
    const loginElement: HTMLElement = fixture.nativeElement.querySelector('.login');
    expect(loginElement).toBeFalsy();
  });


});
