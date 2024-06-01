import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CardDTO } from 'src/app/models/cardDTO.interface';
import { TrackDTO } from 'src/app/models/trackDTO.interface';
import { PlaylistService } from 'src/app/services/playlist.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
  animations: [
    trigger('playlistAnimation', [
      transition('* <=> *', [
        query(':enter',
          [style({opacity: 0}), stagger('200ms', animate('500ms ease-out', style({opacity: 1})))], {optional: true}
        )
      ])
    ])
  ]
})
export class PlaylistComponent implements OnInit {

  tracks: TrackDTO[] = [];
  cards: CardDTO[] = [];

  dataSource = new MatTableDataSource<TrackDTO>();
  columnsToDisplay: string[] = ['image', 'artist', 'album', 'albumType', 'duration', 'popularity', 'id'];

  showCardsLayout: boolean = true;
  showGridLayout: boolean = false;
  defaultLayout: string = 'card';

  constructor(
    private playlistService: PlaylistService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.loadPlaylist();
    this.onToggleChange(this.defaultLayout);
  }

  loadPlaylist(): void {

    this.showSpinner(true);

    this.playlistService.getAllTracks().subscribe((res) => {

        const items = res.items;

        this.tracks = items.map((item: any) => {
          const track = item.track;

          return {
              id: track.id,
              album: track.album.name,
              albumType: track.album.album_type,
              artist: track.artists.map((artist: any) => artist.name).join(' & '),
              image: track.album.images[0].url,
              duration: track.duration_ms,
              popularity: track.popularity,
              previewURI: track.preview_url,
              albumURI: track.external_urls.spotify
            }    
        })

        this.dataSource.data = this.tracks;

        this.tracks.forEach((track) => {
          this.cards.push({
            id: track.id, 
            image: track.image,
            title: track.artist,
            subtitle: track.album,
            type: track.albumType,
            duration: track.duration,
            popularity: track.popularity
          })
        })

        this.showSpinner(false);;
      });
  }

  showSpinner(value: boolean): void {
    this.sharedService.spinnerManagement.next(value);
  }

  onToggleChange(value: string) {
    this.showSpinner(true);

    if ( value === 'grid') {
      this.showCardsLayout = false;
      this.showGridLayout = true;
    } else if ( value === 'card' ) {
      this.showCardsLayout = true;
      this.showGridLayout = false;
    }

    setTimeout(() => {
      this.showSpinner(false);
    }, 500);
  }
}
