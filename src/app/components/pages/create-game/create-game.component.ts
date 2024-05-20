import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setButtonValue } from 'src/app/state/actions/button.action';
import { setLabelValue } from 'src/app/state/actions/input.actions';
import { AppState } from 'src/app/state/app.state';
import { selectIsLoadingSelector } from 'src/app/state/selectors/loading-modal.selector';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  isLoading$: Observable<boolean>;

  constructor(private store : Store<AppState>) {
    this.isLoading$ = new Observable<boolean>();
   }


  ngOnInit(): void {
    this.isLoading$ = this.store.select(selectIsLoadingSelector);

    this.setLabelInput('Nombra la partida');
    this.setButtonText('Crear partida');
  }


  setLabelInput(labelValue:string){
    this.store.dispatch(setLabelValue({newLabel: {label: labelValue}}));
  }

  setButtonText(buttonValue:string) {
    this.store.dispatch(setButtonValue({newButton: {buttonText: buttonValue}}));
  }

}
