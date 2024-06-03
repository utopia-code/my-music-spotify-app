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
  private tokenExpiration: number = 0;
  private localStorageKey: string = 'spotify_access_token';
  private localStorageExpirationKey: string = 'spotify_token_expiration';

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
          this.tokenExpiration = Date.now() + response.expires_in * 1000;
          localStorage.setItem(this.localStorageKey, this.accessToken);
          localStorage.setItem(this.localStorageExpirationKey, this.tokenExpiration.toString());
          return this.accessToken;
        }),
        catchError(error => {
          console.error('Error obtaining access token', error);
          throw error;
        })
    );
  }

  getCachedToken(): string | null {
    const token = localStorage.getItem(this.localStorageKey);

    if(!token) {
      return null
    }

    const expiration = parseInt(localStorage.getItem(this.localStorageExpirationKey) || '0', 10);

    if (Date.now() >= expiration) {
      return null;
    }

    return token
  }
}
