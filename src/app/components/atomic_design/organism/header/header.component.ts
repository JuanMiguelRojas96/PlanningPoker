import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProfileProps } from '../../atoms/profile/profile.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectInputValueSelector } from 'src/app/state/selectors/input.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  inputValue$: Observable<string>;

  nameGame:string;

  profileProps: ProfileProps = {
    width: '36px',
    height: '36px',
    fontSize: '14px',
    name: ''
  }

  @Output() buttonClick = new EventEmitter();

  constructor(private store: Store<AppState>) {
    this.nameGame = ""
    this.inputValue$ = new Observable<string>();
  }

  ngOnInit(){
    this.inputValue$ = this.store.select(selectInputValueSelector);
    this.getNameGame();
    this.getName();
  }

  getNameGame(){
    sessionStorage.getItem('nameGame')
    this.nameGame = sessionStorage.getItem('nameGame') ?? 'Planning Poker'
  }

  getName(){
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      this.profileProps.name = parsedData.name.substring(0, 2).toUpperCase();
    }else{
      this.inputValue$.subscribe((value) => {
        this.profileProps.name = value.substring(0, 2).toUpperCase();
      })
    }
  }

  onClickInvite(){
    this.buttonClick.emit();
  }

}
