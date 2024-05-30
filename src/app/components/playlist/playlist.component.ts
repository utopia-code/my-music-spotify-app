import { Component, OnInit } from '@angular/core';
import { Track } from 'src/app/models/track.interface';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  tracks: Track[] = []

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {

    this.playlistService.getAllTracks().subscribe(
      (res) => {

        const items = res.items;

        items.forEach((item: any) => {
          const track = item.track;

          this.tracks.push(
            {
              id: track.id,
              album: track.album.name,
              albumType: track.album.album_type,
              artist: track.artists[0].name,
              image: track.album.images[0].url,
              duration: track.duration_ms,
              popularity: track.popularity,
              previewURL: track.preview_url,
              externalURL: track.external_urls.spotify
            }    
          );
        })
        
      });

  }
}
