import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Track } from 'src/app/models/track.interface';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  tracks: Track[] = [];

  dataSource = new MatTableDataSource<Track>();
  columnsToDisplay: string[] = ['image', 'artist', 'album', 'albumType', 'duration', 'popularity', 'id'];

  showCardsLayout: boolean = true;
  showGridLayout: boolean = false;
  defaultLayout: string = 'card';

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {

    this.playlistService.getAllTracks().subscribe(
      (res) => {

        const items = res.items;

        this.tracks = items.map((item: any) => {
          const track = item.track;

          return {
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
        })

        this.dataSource.data = this.tracks;

      });

      this.onToggleChange(this.defaultLayout);
  }

  onToggleChange(value: string) {
    if ( value === 'grid') {
      this.showCardsLayout = false;
      this.showGridLayout = true;
    } else if ( value === 'card' ) {
      this.showCardsLayout = true;
      this.showGridLayout = false;
    }
  }
}


