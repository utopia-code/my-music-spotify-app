import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackDTO } from 'src/app/models/trackDTO.interface';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  track: TrackDTO;
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
      this.playlistService.getTrackById(identifier).subscribe((track: TrackDTO) => {

        this.track = {
          id: track.id,
          album: track.album,
          albumType: track.albumType,
          artist: track.artist,
          image: track.image,
          duration: track.duration,
          popularity: track.popularity,
          previewURI: track.previewURI,
          albumURI: track.albumURI
        }
  
      });
    }
  }

  showAllDetails(): void {
    this.showDetailContent = !this.showDetailContent;
  }

}
