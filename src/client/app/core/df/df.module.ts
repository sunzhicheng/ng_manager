import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DFControlService } from './df-control.service';
import { DFItemComponent } from './df-item.component';
import { DfFromComponent } from './df.component';
import { UploadModule } from '../upload/upload.module';
import { CascadingModule } from '../cascading/cascading.module';
import { ProcitycountyModule } from '../procitycounty/procitycounty.module';
import { UploadVideoModule } from '../uploadvideo/uploadvideo.module';
import { UploadAudioModule } from '../uploadaudio/uploadaudio.module';


@NgModule({
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterModule,
    UploadModule,
    CascadingModule,
    ProcitycountyModule,
    UploadVideoModule,
    UploadAudioModule ],
  declarations: [DFItemComponent, DfFromComponent],
  exports: [DFItemComponent, DfFromComponent],
  providers: [DFControlService]
})
export class DFModule { }
