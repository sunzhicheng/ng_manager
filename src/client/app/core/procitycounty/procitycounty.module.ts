import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProCityCountyComponent } from './procitycounty';


@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ProCityCountyComponent],
  exports: [ProCityCountyComponent],
  providers: []
})
export class ProcitycountyModule { }
