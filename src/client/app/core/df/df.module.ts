import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DFControlService } from './df-control.service';
import { DFItemComponent } from './df-item.component';
import { DfFromComponent } from './df.component';
import { UploadModule } from '../upload/upload.module';
import { UploadVideoModule } from '../uploadvideo/uploadvideo.module';
import { UploadAudioModule } from '../uploadaudio/uploadaudio.module';
import { KeEditorDynamicComponent } from '../keditor/keEditor.dynamic';
import { DatePickerDynamicComponent } from '../datepicker/datepicker.dynamic';
import { ImgDynamicComponent } from '../upload/img.dynamic';
import { CheckboxsDynamicComponent } from '../checkboxs/checkboxs.dynamic';
import { CombodateDynamicComponent } from '../combodate/combodate.dynamic';
import { TakePointDynamicComponent } from '../map/getpoint.dynamic';
import { ProvinceCityAreaDynamicComponent } from '../provincecityarea/provincecityarea.dynamic';
import { CustomFormsModule } from 'ng2-validation';
import { ModalTreeDynamicComponent } from '../modal/modal.tree.dynamic';
import { ModalTableDynamicComponent } from '../modal/modal.table.dynamic';
import { Ng2TableModule } from '../table/ng-table-module';
import { SelectSearchDynamicComponent } from '../selectsearch/select.search.dynamic';
import { ImgCutDynamicComponent } from '../upload/img.cut.dynamic';
import { ImgCutComponent } from '../upload/img.cut';


@NgModule({
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterModule,
    UploadModule,
    UploadVideoModule,
    FormsModule, CustomFormsModule, Ng2TableModule,
    UploadAudioModule ],
  declarations: [
    DFItemComponent, DfFromComponent,
    KeEditorDynamicComponent, DatePickerDynamicComponent, ImgDynamicComponent,
    CheckboxsDynamicComponent, CombodateDynamicComponent, TakePointDynamicComponent,
    ProvinceCityAreaDynamicComponent, ModalTreeDynamicComponent, ModalTableDynamicComponent,
    SelectSearchDynamicComponent, ImgCutDynamicComponent, ImgCutComponent
  ],
  exports: [
    DFItemComponent, DfFromComponent,
    KeEditorDynamicComponent, DatePickerDynamicComponent, ImgDynamicComponent,
    CheckboxsDynamicComponent, CombodateDynamicComponent, TakePointDynamicComponent,
    ProvinceCityAreaDynamicComponent, ModalTreeDynamicComponent, ModalTableDynamicComponent,
    SelectSearchDynamicComponent, ImgCutDynamicComponent, ImgCutComponent
  ],
  providers: [DFControlService]
})
export class DFModule { }
