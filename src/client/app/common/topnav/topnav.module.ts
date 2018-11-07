import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopnavService } from './topnav.service';
import { TopNavComponent } from './topnav.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [TopNavComponent],
  exports: [TopNavComponent],
  providers: [ TopnavService ]
})
export class TopNavModule { }
