import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setButtonValue } from 'src/app/state/actions/button.action';
import { AppState } from 'src/app/state/app.state';
import { selectButtonTextSelector } from 'src/app/state/selectors/button.selector';
import { selectIsInputValidSelector } from 'src/app/state/selectors/input.selector';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  isInputValid$: Observable<boolean>;
  buttonText$: Observable<string>;

  constructor(private store : Store<AppState>) {
    this.isInputValid$ = new Observable<boolean>();
    this.buttonText$ = new Observable<string>();
  }

  ngOnInit(): void {
    this.isInputValid$ = this.store.select(selectIsInputValidSelector)
    this.buttonText$ = this.store.select(selectButtonTextSelector)
  }

  setButtonText(buttonValue:string) {
    this.store.dispatch(setButtonValue({newButton: {buttonText: buttonValue}}));
  }

}
