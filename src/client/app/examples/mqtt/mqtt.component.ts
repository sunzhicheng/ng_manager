import { Component, OnInit, OnDestroy } from '@angular/core';
import { Paho } from 'ng2-mqtt/mqttws31';


/**
 * This class represents the lazy loaded MqttComponent.
 * https://github.com/icanos/ng2-mqtt
 */
@Component({
  moduleId: module.id,
  selector: 'sd-exam-mqtt',
  templateUrl: 'mqtt.component.html',
})
export class MqttComponent implements OnInit, OnDestroy {

  newName = '';
  errorMessage: string;
  names: any[] = [];

  private _client: Paho.MQTT.Client;

  // constructor() {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this._client = new Paho.MQTT.Client('139.196.153.191', 8083, '/mqtt', '3');

    this._client.onConnectionLost = (responseObject: Object) => {
      console.log('Connection lost.', responseObject);
    };

    const me = this;
    this._client.onMessageArrived = (message: Paho.MQTT.Message) => {
      console.log('Message arrived.', message.payloadString);
      me.addName(message.payloadString);
    };

    // 根据实际项目定义
    this._client.connect({
      userName: 'yinhao',
      password: 'yinhao',
      cleanSession: false,
      keepAliveInterval: 30,
      onSuccess: this.onConnected.bind(this),
      onFailure: this.onConnectedFail.bind(this)
    });
  }

  onConnected(res: any): void {
    console.log('Connected to broker.', res);
    // 根据实际项目定义
    this._client.subscribe('/idorpcom/client/3/#', {qos: 2, onSuccess: this.onSubSuccess.bind(this)});
  }

  onConnectedFail(error: any): void {
    console.log('Connected to broker fail.', error);
  }

  ngOnDestroy() {
    this._client.disconnect();
  }

  onSubSuccess(res: any): void {
    console.log('onSubSuccess to broker.', res);
  }

  /**
   * 测试MQTT消息推送
   */
  sendToMqtt() {
    const msg: Paho.MQTT.Message = new Paho.MQTT.Message(this.newName);
    msg.destinationName = '/idorpcom/client/3/test';
    msg.retained = true;
    msg.qos = 2;

    this._client.send(msg);

    this.newName = '';
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

}
