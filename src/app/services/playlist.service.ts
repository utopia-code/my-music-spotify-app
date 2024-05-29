import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Track } from '../models/track.interface';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  id_playlist: string = '2dHYu32am1pzWWBTVmw8ta';
  url: string = `https://api.spotify.com/`;

  constructor(private http: HttpClient) { }

  getAllTracks(): Observable<any> {
    return this.http.get<any>(`${this.url}v1/playlists/${this.id_playlist}/tracks`);
  }

  getTrackById(id: string): Observable<Track> {
    return this.http.get<Track>(`${this.url}v1/tracks/${id}`);
  }

}