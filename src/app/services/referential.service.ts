import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReferentialService {
  private url = environment.refApiURL + '/referentiel/';
  constructor(private httpClient: HttpClient) { }

  /**
   * getRefs <<UNUSED>>
   * @param apiSchema
   */
  getRefs( apiSchema : string){
    return this.httpClient.get(this.url + apiSchema,{
      withCredentials: true
    });
  }

  /**
   * getRefsCSVFile
   * @param apiSchema
   */
  getRefsCSVFile( apiSchema : string){
    return this.httpClient.get(this.url + apiSchema+"/csv",{
      withCredentials: true,
      responseType: 'blob'
    });
  }

  /**
   * Upload CSV file
   * @param formData
   * @param apiSchema
   */
  public upload(formData:any,apiSchema : string) {
    return this.httpClient.post<any>(this.url + apiSchema, formData, {
      responseType: 'json',
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders({
        "accept": "application/hal+json"
      })
    });
  }
}
