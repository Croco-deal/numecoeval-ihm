/** This is a service code*/
/** Angular Imports */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/** rxjs Imports */
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

/** EmbedDashboard SDK import */
import { embedDashboard } from '@superset-ui/embedded-sdk';

/** 
 * Superset Service
 */
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  /**
   * API URL of Superset to send request
   */
  private apiUrl = 'http://localhost:8090/api/v1/security';

  /**
   * @param {HttpClient} http Http Client to send requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns { access token }
   */
  private fetchAccessToken(): Observable<any> {
    const body = {
      "username": "admin",
      "password": "admin",
      "provider": "db",
      "refresh": true
    };

    const headers = new HttpHeaders({ 
      "Content-Type": "application/json"
    });

    return this.http.post<any>(`${this.apiUrl}/login`, body, { headers });
  }

  /**
   * 
   * @returns { guest token } using @param { accessToken }
   */
  private fetchGuestToken(accessToken: any): Observable<any> {
    const body = {
      "resources": [
        {
          "type": "dashboard",
          "id": "e064e094-d11c-4b88-b970-435ad57a68f2",
        }
      ],
      /**
       * rls: Row Level Security, this differs for client to client ,like what to show each client
       */
      "rls": [{ "clause": "date_lot='2024-02-19'" }],
      "user": {
        "username": "user",
        "first_name": "User",
        "last_name": "User",
      }
    };

    const acc = accessToken["access_token"]; //accessToken is an object in which there are two tokens access_token and refresh_token ,out of which we just need to send access_token to get guest_token
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${acc}`
    });
    
    //guest_token URL should end with forward_slash(/)
    return this.http.post<any>(`${this.apiUrl}/guest_token/`, body, { headers });
  }
  /**
   * 
   * @returns { guest Token }
   */
  getGuestToken(): Observable<any> {
    return this.fetchAccessToken().pipe(
      catchError((error) => {
        console.error(error);
        return throwError(error);
      }),
      switchMap((accessToken: any) => this.fetchGuestToken(accessToken))
    );
  }
  /**
   * 
   * @returns { dashboard }
   */
  embedDashboard(): Observable<void> {
    return new Observable((observer) => {
      this.getGuestToken().subscribe(
        (token) => {
          embedDashboard({
            id: "a270ee49-eef8-49fb-9254-9402ba55adda", // Replace with your dashboard ID
            supersetDomain: 'http://localhost:8090/',
            mountPoint: document.getElementById('dashboard')!,
            fetchGuestToken: () => token["token"],
            dashboardUiConfig: {
              hideTitle: true,
              hideChartControls: true,
              hideTab: true,
            },
          });
          observer.next();
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}