import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'confirm',
  templateUrl: './confirm.component.html',
  styleUrls:['./confirm.component.css']
})
export class ConfirmComponent {
  constructor() {
  }

  @Input() itemForDelete: string = '';
  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  eliminarButtonClick: EventEmitter<string> = new EventEmitter<string>();

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  public eliminarClicked = () => {
    this.eliminarButtonClick.emit("eliminar_button_clicked");
  }

}
