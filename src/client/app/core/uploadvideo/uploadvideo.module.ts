import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UploadVideoComponent } from './uploadvideo';



@NgModule({
  imports: [CommonModule, RouterModule ],
  declarations: [UploadVideoComponent],
  exports: [UploadVideoComponent],
  providers: []
})
export class UploadVideoModule { }
