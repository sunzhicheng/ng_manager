import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UploadAudioComponent } from './uploadaudio';



@NgModule({
  imports: [CommonModule, RouterModule ],
  declarations: [UploadAudioComponent],
  exports: [UploadAudioComponent],
  providers: []
})
export class UploadAudioModule { }
