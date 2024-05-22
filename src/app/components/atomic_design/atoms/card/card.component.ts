import { Component, EventEmitter, Input, Output} from '@angular/core';
import { ProfileProps } from '../profile/profile.component';

export interface CardProps {
  text: string ;
  width: string;
  height: string;
  name?: string;
  selected?: boolean;
  type?: string
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent{

  @Input() profileProps: ProfileProps = {
    width: '56px',
    height: '56px',
    fontSize: '21px',
    name: ''
  };

  @Input() card: CardProps = {
    text: '',
    width: '2.188rem',
    height: '3.75rem',
    type: ''
  };

  @Input() isSelected: boolean = false;
  @Output() cardSelected: EventEmitter<void> = new EventEmitter<void>();


  selectCard() {
    this.cardSelected.emit();
  }
}
