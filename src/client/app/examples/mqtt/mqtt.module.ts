import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MqttComponent } from './mqtt.component';
import { MqttRoutingModule } from './mqtt-routing.module';
import { IdMqttService } from '../../shared/idorp/mqtt/IdMqttService';



@NgModule({
  imports: [FormsModule, CommonModule, MqttRoutingModule ],
  declarations: [MqttComponent],
  exports: [MqttComponent],
  providers: [IdMqttService]
})
export class MqttModule { }
