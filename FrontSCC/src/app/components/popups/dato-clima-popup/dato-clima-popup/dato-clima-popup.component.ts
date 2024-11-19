import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dato-clima-popup',
  templateUrl: './dato-clima-popup.component.html',
  styleUrls: ['./dato-clima-popup.component.css']
})
export class DatoClimaPopupComponent {
  @Input() weatherData: any;

  showSunnyIcon = false;
  showCloudyIcon = false;
  showRainIcon = false;
  weatherDate = null;
  weatherLocation = null;
  message: string = "";

  @Output()
  cancelButtonClick: EventEmitter<string> = new EventEmitter<string>();

  public cancelarClicked() {
    this.cancelButtonClick.emit("cancel_button_clicked");
  }

  public ngOnInit() {
    if (this.weatherData) {
      this.message = "";
      if (this.weatherData.forecast.forecastday.length > 0) {
        const weatherForecast = this.weatherData.forecast.forecastday[0];
        this.weatherDate = weatherForecast.date;
        this.weatherLocation = this.weatherData.location.name;
        if (weatherForecast.day.condition.text.toLowerCase().includes('clear') || weatherForecast.day.condition.text.toLowerCase().includes('sunny')) {
          this.showSunnyIcon = true;
          this.showCloudyIcon = false;
          this.showRainIcon = false;
        } else if (weatherForecast.day.condition.text.toLowerCase().includes('cloud') || weatherForecast.day.condition.text.toLowerCase().includes('overcast')) {
          this.showSunnyIcon = false;
          this.showCloudyIcon = true;
          this.showRainIcon = false;
        } else if (weatherForecast.day.condition.text.toLowerCase().includes('rain') || weatherForecast.day.condition.text.toLowerCase().includes('shower') || weatherForecast.day.condition.text.toLowerCase().includes('storm')) {
          this.showSunnyIcon = false;
          this.showCloudyIcon = false
          this.showRainIcon = true;
        }
      }
    } else {
      this.message = "No fue posible obtener el pronostico para la fecha seleccionada";
    }
  }

}
