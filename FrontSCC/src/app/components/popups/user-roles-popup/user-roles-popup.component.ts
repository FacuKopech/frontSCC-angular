import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-roles-popup',
  templateUrl: './user-roles-popup.component.html',
  styleUrls: ['./user-roles-popup.component.css']
})
export class UserRolesPopupComponent {
  
  @Input() user: any;

  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }
}
