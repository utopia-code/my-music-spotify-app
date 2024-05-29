import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { TrackComponent } from './components/track/track.component';

const routes: Routes = [
  { path: '', component: PlaylistComponent },
  { path: 'track/:id', component: TrackComponent },
  { path: '**', component: PlaylistComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
