import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EntreeService {
  dateJour : Date = new Date();

  constructor(private httpClient: HttpClient) { }
  private url = environment.entreeApiURL + '/entrees/csv';
  
  public upload(formData:any) {
    return this.httpClient.post<any>(this.url , formData, {
      responseType: 'json',
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders({"accept": "application/json"})
    });
  }
}
