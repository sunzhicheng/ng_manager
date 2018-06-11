import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VideoToolComponent } from './videotool';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { VgStreamingModule } from 'videogular2/streaming';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [SharedModule,
    CommonModule,
    FormsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule
  ],
  declarations: [VideoToolComponent],
  exports: [VideoToolComponent],
  providers: []
})
export class VideoToolModule { }
