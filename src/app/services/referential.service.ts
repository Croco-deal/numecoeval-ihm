import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReferentialService {
  private url = environment.refApiURL + '/referentiel/typesEquipement';
  constructor(private httpClient: HttpClient) { }

  getPosts(){
    return this.httpClient.get(this.url,{
      withCredentials: true
    });
  }
}
