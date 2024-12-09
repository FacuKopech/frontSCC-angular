import { Component, Input } from '@angular/core';
import { AusenciaService } from 'src/app/services/ausencias_services/ausencia.service';
import { Location } from '@angular/common';
import { NotaService } from 'src/app/services/notas_services/nota.service';

@Component({
  selector: 'app-archivos-ausencia',
  templateUrl: './archivos-ausencia.component.html',
  styleUrls: ['./archivos-ausencia.component.css']
})
export class ArchivosAusenciaComponent {
  @Input() ausencia: any;
  @Input() nota: any;
  filesNames: Blob[] = [];
  message: string = '';
  esAusencia = false;
  stringToReplaceAusencia = /Ausencia-\d+-/;
  stringToReplaceNota = /Nota-\d+-/;
  constructor(private ausenciaService: AusenciaService, private notaService: NotaService, private location: Location) { }

  ngOnInit() {
    if (history.state.data.cuerpo == null) {
      this.esAusencia = true;
      this.ausencia = history.state.data;
      this.ausenciaService.ObtenerArchivosAusencia(this.ausencia.id).subscribe((blob: Blob[]) => {
        this.filesNames = blob;
        if (blob.length === 0) {
          this.message = "No existen archivos adjuntos";
        }
      });
    } else {
      this.esAusencia = false;
      this.nota = history.state.data;
      this.notaService.ObtenerArchivosNota(this.nota.id).subscribe((blob: Blob[]) => {
        this.filesNames = blob;
        if (blob.length === 0) {
          this.message = "No existen archivos adjuntos";
        }
      });
    }
  }

  public downloadFile(fileName: string, contentType: string, data: string) {
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
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  public goBack() {
    this.location.back();
  }
}
