import { Component, Input } from '@angular/core';
import { AusenciaService } from 'src/app/services/ausencias_services/ausencia.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-archivos-ausencia',
  templateUrl: './archivos-ausencia.component.html',
  styleUrls: ['./archivos-ausencia.component.css']
})
export class ArchivosAusenciaComponent {
  @Input() ausencia: any;
  filesNames: Blob[] = [];
  message: string='';
  stringToReplace = /Ausencia-\d+-/;
  constructor(private ausenciaService: AusenciaService, private location: Location){}
  ngOnInit(){
    this.ausencia = history.state.data;
    this.ausenciaService.ObtenerArchivosAusencia(this.ausencia.id).subscribe((blob: Blob[]) => {
      this.filesNames = blob;

      if(this.filesNames.length == 0){
        this.message = "Esta ausencia no posee archivos adjuntos";
      }
      console.log(blob, this.filesNames, this.filesNames[0]);
    });
  }

  public downloadFile(fileName: string, contentType: string, data:string) {
    const byteArray = new Uint8Array(
      atob(data)
        .split('')
        .map((char) => char.charCodeAt(0))
      );
    var blobObj = new Blob([byteArray], { type: contentType });

    var url = URL.createObjectURL(blobObj);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName.replace(/Ausencia-\d+-/, "");

    document.body.appendChild(link);
    console.log(link.href, link.download, url);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  public goBack(){
    this.location.back();
  }
}
