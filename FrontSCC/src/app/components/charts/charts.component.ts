import { Component, HostListener } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartsService } from 'src/app/services/charts_services/charts.service';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {

  constructor(private chartsService: ChartsService){}
  
  public chartLogins: any;
  public chartAsistencias: any;
  public chartCondiciones: any;

  public loginsAvgs: [] = [];
  public sessionTimeAvgs: [] = [];
  public asistenciasPorAulaAvgs: any[] = [];
  public condicionesPorAulaAvgs: any[] = [];
  public directivoAvg: number = 0;
  public docenteAvg: number = 0;
  public padreAvg: number = 0;
  public directivoSessionTimeAvg: number = 0;
  public docenteSessionTimeAvg: number = 0;
  public padreSessionTimeAvg: number = 0;
  public backgroundColorsAsistenciasDataset: string[] = [];
  public backgroundColorsCondicionesDataset: string[] = [];

  createChartLogins(){   
    this.chartLogins = new Chart("LoginsChart", {
      type: 'bar', 
      data: {
        labels: ['Directivos', 'Docentes', 'Padres' ], 
	       datasets: [
          {
            label: "LogIns",
            data: [this.directivoAvg, this.docenteAvg, this.padreAvg],
            backgroundColor: this.getRandomColor()
          },
          {
            label: "Tiempo de sesion",
            data: [this.directivoSessionTimeAvg, this.docenteSessionTimeAvg, this.padreSessionTimeAvg],
            backgroundColor: this.getRandomColor()
          }    
        ]
      },
      options: {
        aspectRatio:2.5
      }      
    });
  }

  createChartAsistencias(){
    let labelsAulas: string[] = [];
    let dataAsistencias: number[] = [];
    this.asistenciasPorAulaAvgs.forEach(item => {
      labelsAulas.push(item.nombreAula);
      dataAsistencias.push(item.avg);
      this.backgroundColorsAsistenciasDataset.push(this.getRandomColor());
    });

    this.chartAsistencias = new Chart("AsistenciasChart", {
      type: 'pie', 
      data: {
        labels: labelsAulas, 
	       datasets: [
          {
            label: "Asistencia",
            data: dataAsistencias,
            backgroundColor: this.backgroundColorsAsistenciasDataset
          }            
        ]
      },
      options: {
        aspectRatio:2.5
      }      
    });
  }

  createChartCondiciones(){
    let labelsAulas: string[] = [];
    let dataCondiciones: number[] = [];
    this.condicionesPorAulaAvgs.forEach(item => {
      labelsAulas.push(item.nombreAula);
      dataCondiciones.push(item.avg);
      this.backgroundColorsCondicionesDataset.push(this.getRandomColor());
    });
    

    this.chartCondiciones = new Chart("CondicionesChart", {
      type: 'pie', 
      data: {
        labels: labelsAulas, 
	       datasets: [
          {
            label: "Condicion",
            data: dataCondiciones,
            backgroundColor: this.backgroundColorsCondicionesDataset
          }            
        ]
      },
      options: {
        aspectRatio:2.5
      }      
    });
  }

  getRandomColor() {    
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateChartSize();
  }

  updateChartSize() {
    if (this.chartLogins && this.chartAsistencias && this.chartCondiciones) {
      this.chartLogins.resize();
      this.chartAsistencias.resize();
      this.chartCondiciones.resize();
    }
  }

  public ngOnInit(){
    this.chartsService.ObtenerLogInsAverage().subscribe(res => {
      if(res){
        this.directivoAvg = res.loginsAvgs[0];
        this.docenteAvg = res.loginsAvgs[1];
        this.padreAvg = res.loginsAvgs[2];
        this.directivoSessionTimeAvg = res.sessionTimeAvgs[0];
        this.docenteSessionTimeAvg = res.sessionTimeAvgs[1];
        this.padreSessionTimeAvg = res.sessionTimeAvgs[2];
        this.createChartLogins();
        this.chartsService.ObtenerAsistenciasPorAulaAverage().subscribe(res => {
          if(res){
            this.asistenciasPorAulaAvgs = res;
            this.createChartAsistencias();
            this.chartsService.ObtenerCondicionPorAulaAverage().subscribe(res => {
              if(res){
                this.condicionesPorAulaAvgs = res;
                this.createChartCondiciones();
              }
            })
          }
        })
      }
    });
   
  }
}
