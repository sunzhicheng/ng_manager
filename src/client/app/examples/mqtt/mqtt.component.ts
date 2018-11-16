import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Paho } from 'ng2-mqtt/mqttws31';
import { IdMqttService } from '../../shared/idorp/mqtt/IdMqttService';
import { Router } from '@angular/router';


/**
 * This class represents the lazy loaded MqttComponent.
 * https://github.com/icanos/ng2-mqtt
 */
@Component({
  moduleId: module.id,
  selector: 'demo-mqtt',
  templateUrl: 'mqtt.component.html',
})
export class MqttComponent implements AfterViewInit {
  newName = '';
  errorMessage: string;
  names: any[] = [];


  constructor(private mqttService: IdMqttService,
    private _router: Router) { }

  ngAfterViewInit(): void {
    this.mqttService.start('/idorpcom/client/3/#', (message: Paho.MQTT.Message) => {
      console.log('Message arrived.', message.payloadString);
      this.addName(message.payloadString);
    });
  }
  /**
   * 测试MQTT消息推送
   */
  sendToMqtt() {
    this.mqttService.publish('/idorpcom/client/3/test', this.newName);
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(msg: String): boolean {
    // TODO: implement nameListService.post
    this.names.push(msg);
    return false;
  }

  toLogin() {
    const link = ['/'];
    this._router.navigate(link);
  }

}
