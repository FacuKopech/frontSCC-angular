import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/user_services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private apiService: ApiService, private router: Router) { }
  public username: string = "";
  public groups: any[] = [];


  public ngOnInit(): void {
    this.apiService.isLoggedIn().subscribe(res => {
      if (res) {
        this.username = res.usuario.username;
        this.groups = res.usuario.grupos;
      }
    });
  }

  public NotasEmitidas(): void {
    this.router.navigate(['/notas_emitidas']);
  }

  public NotasRecibidas(): void {
    this.router.navigate(['/notas_recibidas']);
  }
}
