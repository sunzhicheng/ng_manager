import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MqttComponent } from './mqtt.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'mqtt', component: MqttComponent }
    ])
  ],
  exports: [RouterModule]
})
export class MqttRoutingModule { }
