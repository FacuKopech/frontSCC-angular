import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/user_services/api.service';

@Component({
  selector: 'app-nota-leida-alert',
  templateUrl: './nota-leida-alert.component.html',
  styleUrls: ['./nota-leida-alert.component.css']
})
export class NotaLeidaAlertComponent {

  username: string = '';
  @Input() logueoFueraDeHorario = false;
  constructor(private apiService: ApiService){}
  @Output()
  aceptarButtonClick: EventEmitter<string> = new EventEmitter<string>();

  public aceptarClicked() {
    this.logueoFueraDeHorario = false;
    this.aceptarButtonClick.emit("aceptar_button_clicked");
  }

  ngOnInit(){
    if(this.logueoFueraDeHorario){
      this.getUsername();
    }
  }

  public getUsername(){
    this.apiService.isLoggedIn().subscribe(res => {
      if (res) {
        this.username = res['username'];
      }
    });
  }
}
