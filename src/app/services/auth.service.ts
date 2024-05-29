import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clientId = 'd20262b91ea143a482d0b527ccacbce1';
  private clientSecret = '37b3164ac9ce49589cbf64be6ca1b1e0';
  private tokenUrl = 'https://accounts.spotify.com/api/token';
  private accessToken: string = '';

  constructor(private http: HttpClient) {}

  getAccessToken(): Observable<string> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`)
    });

    const body = new URLSearchParams({
      grant_type: 'client_credentials'
    }).toString();

    return this.http.post<any>(this.tokenUrl, body, { headers })
      .pipe(
        map(response => {
          this.accessToken = response.access_token;
          return this.accessToken;
        }),
        catchError(error => {
          console.error('Error obtaining access token', error);
          throw error;
        })
      );
  }
}
