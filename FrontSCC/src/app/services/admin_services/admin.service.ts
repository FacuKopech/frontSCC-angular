import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private hostUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public Backup(): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Sistema/Backup/`);
  }

  public Restore(): Observable<any> {
    return this.http.get<any>(this.hostUrl + `/Sistema/Restore/`);
  }

}
