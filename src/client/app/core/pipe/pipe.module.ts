import { SafePipe } from './safepipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [SafePipe],
  exports: [SafePipe],
})
export class PipeModule { }
