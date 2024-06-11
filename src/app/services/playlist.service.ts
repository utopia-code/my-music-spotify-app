import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TrackDTO } from '../models/trackDTO.interface';
import { TrackResponseDTO } from '../models/trackResponseDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  id_playlist: string = '2dHYu32am1pzWWBTVmw8ta';
  url: string = `https://api.spotify.com/`;

  constructor(private http: HttpClient) { }

  getAllTracks(): Observable<TrackDTO[]> {
    return this.http.get<any>(`${this.url}v1/playlists/${this.id_playlist}/tracks`).pipe(
      map(response => response.items.map((item: any) => this.mapResponseToTracks(item.track)))
    );
  }

  getTrackById(id: string): Observable<TrackDTO> {
    return this.http.get<TrackDTO>(`${this.url}v1/tracks/${id}`).pipe(
      map(response => this.mapResponseToTracks(response))
    );
  }

  private mapResponseToTracks(track: any): TrackResponseDTO {
    return {
      id: track.id,
      album: track.album.name,
      albumType: track.album.album_type,
      artist: track.artists.map((artist: any) => artist.name).join(' & '),
      image: track.album.images[0].url,
      duration: track.duration_ms,
      popularity: track.popularity,
      previewURI: track.uri,
      albumURI: track.album.uri
    }
  }
}
