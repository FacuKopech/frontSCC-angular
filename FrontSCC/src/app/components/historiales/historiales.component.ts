import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-historiales',
  templateUrl: './historiales.component.html',
  styleUrls: ['./historiales.component.css']
})
export class HistorialesComponent {
  constructor( private location: Location){}
  public goBack(){
    this.location.back();
  }
}
