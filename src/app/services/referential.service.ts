import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReferentialService {
  private url = environment.refApiURL + '/referentiel/';
  constructor(private httpClient: HttpClient) { }

  getRefs( apiSchema : string){
    return this.httpClient.get(this.url + apiSchema,{
      withCredentials: true
    });
  }
}
