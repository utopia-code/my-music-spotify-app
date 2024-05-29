import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaylistComponent } from './components/playlist/playlist.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TrackComponent } from './components/track/track.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    TrackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
