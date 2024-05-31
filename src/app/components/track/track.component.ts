import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Track } from 'src/app/models/track.interface';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  track: Track;
  token: string = '';
  showDetailContent: boolean = false;

  constructor(
    private playlistService: PlaylistService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.track = {
      id: '',
      album: '',
      albumType: '',
      artist: '',
      image: '',
      duration: 0,
      popularity: 0,
      previewURI: '',
      albumURI: ''
    }
  }


  ngOnInit(): void {
    const identifier = this.activatedRoute.snapshot.paramMap.get('id');

    if (identifier) {
      this.playlistService.getTrackById(identifier).subscribe((track: any) => {

        this.track = {
          id: track.id,
          album: track.album.name,
          albumType: track.album.album_type,
          artist: track.artists[0].name,
          image: track.album.images[0].url,
          duration: track.duration_ms,
          popularity: track.popularity,
          previewURI: track.uri,
          albumURI: track.album.uri
        }
  
      });
    }
  }

  showAllDetails(): void {
    this.showDetailContent = !this.showDetailContent;
  }

}
