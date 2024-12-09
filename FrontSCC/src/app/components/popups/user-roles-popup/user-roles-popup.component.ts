import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/user_services/api.service';

@Component({
  selector: 'app-user-roles-popup',
  templateUrl: './user-roles-popup.component.html',
  styleUrls: ['./user-roles-popup.component.css']
})
export class UserRolesPopupComponent {
  
  @Input() user: any;

  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();
  
  roles: any[] = [];

  constructor(private userService: ApiService){}

  ngOnInit(): void{
    this.userService.ObtenerRolesUsuario(this.user.id).subscribe(res => {     
      if(res){
        this.roles = res;
      }
    });
  }

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }
}
