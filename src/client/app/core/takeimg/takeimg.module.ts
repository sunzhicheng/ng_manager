import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TakeImgComponent } from './takeimg';



@NgModule({
  imports: [CommonModule, RouterModule ],
  declarations: [TakeImgComponent],
  exports: [TakeImgComponent],
  providers: []
})
export class TakeImgModule { }
