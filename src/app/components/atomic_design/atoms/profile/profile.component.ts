import { Component, Input} from '@angular/core';


export interface ProfileProps {
  width: string;
  height: string;
  fontSize: string;
  name: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent{

  @Input() profileProps: ProfileProps = {
    width: '56px',
    height: '56px',
    fontSize: '21',
    name: ''
  };



}
