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

  constructor(
    private playlistService: PlaylistService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.track = {
      id: '',
      album: '',
      artist: '',
      images: '',
      image_width: 0,
      image_height: 0
    }
  }


  ngOnInit(): void {
    const identifier = this.activatedRoute.snapshot.paramMap.get('id');

    if (identifier) {
      this.playlistService.getTrackById(identifier).subscribe((track: any) => {
  
        this.track = {
          id: track.id,
          album: track.album.na,
          artist: track.artists[0].name,
          images: track.album.images[0].url,
          image_width: track.album.images[0].width,
          image_height: track.album.images[0].height
        }
  
      });
    }

  }

}
