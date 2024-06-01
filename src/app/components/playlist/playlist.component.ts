import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CardDTO } from 'src/app/models/cardDTO.interface';
import { GridDTO } from 'src/app/models/gridDTO.interface';
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
  grids: GridDTO[] = [];

  dataSource = new MatTableDataSource<GridDTO>();
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

        this.tracks = this.createTracks(items);
        this.cards = this.createCards(this.tracks);
        this.grids = this.createGrids(this.tracks);

        this.dataSource.data = this.grids;

        this.showSpinner(false);;
      });
  }

  createTracks(items: any): TrackDTO[] {
    return items.map((item: any) => {
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
  }

  createCards(tracks: TrackDTO[]): CardDTO[] {
    return tracks.map((track) => ({
      id: track.id, 
      image: track.image,
      title: track.artist,
      subtitle: track.album,
      type: track.albumType,
      duration: track.duration,
      popularity: track.popularity
    }))
  }

  createGrids(tracks: TrackDTO[]): GridDTO[] {
    return tracks.map((track) => ({
      image: track.image,
      artist: track.artist,
      album: track.album,
      type: track.albumType,
      duration: track.duration,
      popularity: track.popularity,
      id: track.id
    }))
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
