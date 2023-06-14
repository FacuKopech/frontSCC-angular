import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-go-back-button',
  templateUrl: './go-back-button.component.html',
  styleUrls: ['./go-back-button.component.css']
})
export class GoBackButtonComponent {
  @Output()
  backButtonClick: EventEmitter<string> = new EventEmitter<string>();

  public goBackClick(){
    this.backButtonClick.emit("back_button_clicked");
  }
}
