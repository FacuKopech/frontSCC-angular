import { Component } from '@angular/core';
import { LoaderService } from '../../loader/loader.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(-100%)' })),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out')),
    ])
  ]
})
export class SpinnerComponent {
  messages = [
    'Estamos trabajando en ello...',
    'Por favor, aguarde...',
    'Ya casi...',
    'Estamos finalizando...',
  ];

  currentMessageIndex = 0;

  constructor(public loader: LoaderService) {
    this.startMessageRotation();
  }

  startMessageRotation() {
    setInterval(() => {
      if (this.loader.getLoading()) {
        setTimeout(() => {
          this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messages.length;
        }, 100);
      }
    }, 3000);
  }
}
