import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VideoComponent } from './video.component';
import { MultiplePlayersComponent } from './multiple-players.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'video', component: VideoComponent },
      { path: 'videom', component: MultiplePlayersComponent }
    ])
  ],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
