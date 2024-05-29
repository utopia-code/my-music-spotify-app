import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaylistComponent } from './components/playlist/playlist.component';

import { TrackComponent } from './components/track/track.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    TrackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
