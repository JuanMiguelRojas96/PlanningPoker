import { Component} from '@angular/core';

@Component({
  selector: 'app-invite-modal',
  templateUrl: './invite-modal.component.html',
  styleUrls: ['./invite-modal.component.scss']
})
export class InviteModalComponent{

  viewModal: boolean = false;

  constructor() { }

  copyLink(inputElement: HTMLInputElement) {
    inputElement.select();
    document.execCommand('copy');
  }

  changeShow() {
    this.viewModal = !this.viewModal;
  }

}
