import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './index';



@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
  providers: []
})
export class SideBarModule { }
