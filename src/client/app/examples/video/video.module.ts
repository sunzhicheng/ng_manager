import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';

import { VideoComponent } from './video.component';
import { MultiplePlayersComponent } from './multiple-players.component';
import { VideoRoutingModule } from './video-routing.module';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { VgStreamingModule } from 'videogular2/streaming';

@NgModule({
  imports: [SharedModule,
    CommonModule,
    FormsModule,
    VideoRoutingModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule],
  declarations: [VideoComponent, MultiplePlayersComponent],
  exports: [VideoComponent, MultiplePlayersComponent],
  providers: []
})
export class VideoModule { }
