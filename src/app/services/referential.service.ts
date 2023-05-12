import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReferentialService {
  private url = environment.refApiURL + '/referentiel/';
  constructor(private httpClient: HttpClient) { }

  getRefs( apiSchema : string){
    debugger
    return this.httpClient.get(this.url + apiSchema,{
      withCredentials: true
    });
  }

  getRefsCSVFile( apiSchema : string){
    debugger
    return this.httpClient.get(this.url + "/"+apiSchema+"/csv",{
      withCredentials: true,
      responseType: 'blob'
    });
  }

  postRefs(file:any,apiSchema : string){
    debugger
    // var reader = new FileReader();
    // reader.onload = (event: any) => {
    //   const localUrl = event.target.value;
    //   debugger
    // }
    // reader.readAsDataURL(file);
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "multipart/form-data",
        "accept": "application/hal+json"
      })
    };
    var form = new FormData();
    form.append("file", file, "mixElec-2023-05-11_043356.csv");

    // formData.append("file", file);
    // formData.append("filename", file.name);
    // formData.append("Content-Type", "text/csv");
    return this.httpClient.post(this.url + apiSchema,form , httpOptions)
  }

  public upload(formData:any,apiSchema : string) {
    return this.httpClient.post<any>(this.url + apiSchema, formData, {
      reportProgress: true,
      observe: 'events',
      withCredentials:true,
      headers: new HttpHeaders({
        "Content-Type": "multipart/form-data",
        "accept": "application/hal+json"
      })
    });
  }
}

/***
 * fetch("https://api-referentiels-numecoeval.datahub.din.developpement-durable.gouv.fr/referentiel/mixelecs/csv", {
 *   "headers": {
 *     "accept": "application/hal+json",
 *     "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,ar;q=0.6",
 *     "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryGNKpFaFXOxRRGHEP",
 *     "sec-ch-ua": "\"Chromium\";v=\"112\", \"Google Chrome\";v=\"112\", \"Not:A-Brand\";v=\"99\"",
 *     "sec-ch-ua-mobile": "?0",
 *     "sec-ch-ua-platform": "\"macOS\"",
 *     "sec-fetch-dest": "empty",
 *     "sec-fetch-mode": "cors",
 *     "sec-fetch-site": "same-origin",
 *     "Referer": "https://api-referentiels-numecoeval.datahub.din.developpement-durable.gouv.fr/swagger-ui/index.html?urls.primaryName=Administration%20NumEcoEval",
 *     "Referrer-Policy": "strict-origin-when-cross-origin"
 *   },
 *   "body": "------WebKitFormBoundaryGNKpFaFXOxRRGHEP\r\nContent-Disposition: form-data; name=\"file\"; filename=\"mixElec-2023-05-11_043356.csv\"\r\nContent-Type: text/csv\r\n\r\n\r\n------WebKitFormBoundaryGNKpFaFXOxRRGHEP--\r\n",
 *   "method": "POST"
 * });
 */
