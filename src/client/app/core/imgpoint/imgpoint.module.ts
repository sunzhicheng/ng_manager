import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImgPointComponent } from './imgpoint';



@NgModule({
  imports: [CommonModule, RouterModule ],
  declarations: [ImgPointComponent],
  exports: [ImgPointComponent],
  providers: []
})
export class ImgPointModule { }
