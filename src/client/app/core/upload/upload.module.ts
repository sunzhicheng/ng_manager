import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UploadComponent } from './upload';



@NgModule({
  imports: [CommonModule, RouterModule ],
  declarations: [UploadComponent],
  exports: [UploadComponent],
  providers: []
})
export class UploadModule { }
