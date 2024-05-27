import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';
import { setInputValue, setLabelValue } from 'src/app/state/actions/input.actions';
import { AppState } from 'src/app/state/app.state';
import { selectInputLabelSelector, selectInputValueSelector, selectIsInputValidSelector } from 'src/app/state/selectors/input.selector';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  label$: Observable<string>;
  inputValue$: Observable<string>;
  isInputValid$: Observable<boolean>;


  constructor(private store : Store<AppState>) {
    this.label$ = new Observable<string>();
    this.inputValue$ = new Observable<string>();
    this.isInputValid$ = new Observable<boolean>();
  }

  ngOnInit(): void {
    this.store.dispatch(setInputValue({newInput: {inputValue: ''}}));
    this.label$ = this.store.select(selectInputLabelSelector);
    this.inputValue$ = this.store.select(selectInputValueSelector);
    this.isInputValid$ = this.store.select(selectIsInputValidSelector);
  }

  onInputValueChange(event:Event) {
    const value = (event.target as HTMLInputElement).value;
    this.store.dispatch(setInputValue({newInput: {inputValue: value}}));
  }

  setLabel(labelValue:string) {
    this.store.dispatch(setLabelValue({newLabel: {label: labelValue}}));
  }

}
