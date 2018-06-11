import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CascadingComponent } from './cascading';



@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  declarations: [CascadingComponent],
  exports: [CascadingComponent]
})
export class CascadingModule { }
