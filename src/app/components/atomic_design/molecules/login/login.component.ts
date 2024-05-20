import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setButtonValue } from 'src/app/state/actions/button.action';
import { setLabelValue } from 'src/app/state/actions/input.actions';
import { AppState } from 'src/app/state/app.state';
import { selectInputValueSelector } from 'src/app/state/selectors/input.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loadingGame: Observable<boolean>;

  inputValue$: Observable<string>;
  selectedRole: string;
  inputValue: string;

  constructor(private store : Store<AppState>) {
    this.inputValue$ = new Observable<string>();

    this.selectedRole = 'Player';
    this.inputValue = '';
  }

  ngOnInit(): void {
    this.inputValue$ = this.store.select(selectInputValueSelector);
    this.setLabelInput('Tu nombre');
    this.setButtonText('Continuar');
  }

  setLabelInput(labelValue:string){
    this.store.dispatch(setLabelValue({newLabel: {label: labelValue}}));
  }

  setButtonText(buttonValue:string) {
    this.store.dispatch(setButtonValue({newButton: {buttonText: buttonValue}}));
  }


  updateSessionStorage() {
    this.inputValue$.subscribe((value) => {
      this.inputValue = value;
    });

    const data = {

      inputValue: this.inputValue,
      selectedRole: this.selectedRole
    };
    sessionStorage.setItem('userData', JSON.stringify(data));
  }

  onLogin() {
    this.updateSessionStorage();
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onLogin();
    }
  }

}
