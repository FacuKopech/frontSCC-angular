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

  public Backup(): Observable<string> {
    return this.http.get<string>(this.hostUrl + `/Sistema/Backup/`);
  }

}
