import { Injectable, OnDestroy } from '@angular/core';
import { Paho } from 'ng2-mqtt/mqttws31';
import { IdLog } from '../../tool/IdLog';
import { Mqtt } from '../../tool/Mqtt';

@Injectable()
export class IdMqttService extends Mqtt implements OnDestroy {
    mqttClient: Paho.MQTT.Client;
    constructor() {
        super();
      }
    start(subscribeTopic: any, onMessageArrived?: any, clientId?: string,
        onConnectLost?: any, onMessageDelivered?: any) {
        this.mqttClient = this.getClient(clientId, onMessageArrived, onConnectLost, onMessageDelivered);
        this.connect(this.mqttClient, null, null,
            (event1: any) => {
                IdLog.log('MQTT 连接成功', event1);
                Mqtt._clients.push(this.mqttClient);
                // 订单小程序的近推送数据
                this.subscribe(subscribeTopic, {
                    qos: 0,
                    onSuccess: (event3: any) => {
                        IdLog.log('MQTT 订阅成功', event3);
                    }
                });
            },
            (event2: any) => {
                IdLog.log('MQTT 连接失败', event2);
            });
    }

    /**
     * 订阅消息
     * @param topic 订阅主题
     * @param subscribeOptions 订阅配置
     */
    public subscribe(topic: string, subscribeOptions?: any) {
        super._subscribe(this.mqttClient, topic, subscribeOptions);
    }

    /**
     * 订阅消息
     * @param topic 订阅主题
     * @param subscribeOptions 订阅配置
     */
    public unsubscribe(topic: string, subscribeOptions?: any) {
        super._unsubscribe(this.mqttClient, topic, subscribeOptions);
    }

    /**
     * 消息发布
     * @param topic 发布主题
     * @param message 消息内容
     * @param qos 消息级别
     * @param retained 是否保存离线
     */
    public publish(topic: string, message: string, qos = 0, retained = false) {
        super._publish(this.mqttClient, topic, message, qos, retained);
    }
    ngOnDestroy(): void {
        super._disconnect(this.mqttClient);
    }
}

