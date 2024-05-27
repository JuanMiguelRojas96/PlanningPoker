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

  isLogin: boolean;

  inputValue$: Observable<string>;
  selectedRole: string;
  name: string;

  constructor(private store : Store<AppState>) {
    this.isLogin = true;
    this.inputValue$ = new Observable<string>();

    this.selectedRole = 'Player';
    this.name = '';
  }

  ngOnInit(): void {
    sessionStorage.removeItem('userData');
    this.inputValue$ = this.store.select(selectInputValueSelector);

    this.setLabelInput('Tu nombre');
    this.setButtonText('Continuar');
    this.getUserData();
  }

  setLabelInput(labelValue:string){
    this.store.dispatch(setLabelValue({newLabel: {label: labelValue}}));
  }

  setButtonText(buttonValue:string) {
    this.store.dispatch(setButtonValue({newButton: {buttonText: buttonValue}}));
  }


  updateSessionStorage() {
    this.inputValue$.subscribe((value) => {
      this.name = value;

      const data = {
        name: this.name,
        selectedRole: this.selectedRole
      };
      sessionStorage.setItem('userData', JSON.stringify(data));
    });
  }


  getUserData() {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData).name;
      if (parsedData != "") {
        this.isLogin = false;
      }
    }
  }


  onLogin() {
    this.updateSessionStorage();
    this.isLogin = false;
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onLogin();
    }
  }

}
