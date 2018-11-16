import { Injectable } from '@angular/core';
import { Paho } from 'ng2-mqtt/mqttws31';
import { IdTool } from './IdTool';
import { IdLog } from './IdLog';


export const SUB_TPOIC_TEST = '/test/sub';
export const PUB_TPOIC_TEST = '/test/pub';


@Injectable()
export class Mqtt {
    static _clients: Array<Paho.MQTT.Client> = [];
    //是否使用url 方式连接
    mUrlConnect = true;
    /**
     * 关闭整个系统所有的mqtt 连接
     */
    static clear() {
        IdLog.log('执行clear方法start  mqtt连接池数量  ： ' + Mqtt._clients.length);
        if (Mqtt._clients.length > 0) {
            for (let index = 0; index < Mqtt._clients.length; index++) {
                const c = Mqtt._clients[index];
                if (c.isConnected()) {
                    c.disconnect();
                }
            }
            Mqtt._clients.splice(0, Mqtt._clients.length);
            IdLog.log('执行clear方法end  mqtt连接池数量  ： ' + Mqtt._clients.length);
        }
    }
    // MQTT 服务器配置生成
    protected mqttServer = () => {
        return {
            host: 'emq.naliangkuai.com',
            // port: 8083,
            // host: 'emq.naliangkuai.com',
            port: 443,
            path: '/mqtt',
            clientId: IdTool.randomString(10),
            url: 'wss://emq.naliangkuai.com/mqtt'
        };
    }

    // MQTT 连接配置生成
    protected mqttConnect = () => {
        return {
            userName: IdTool.randomString(5),
            password: IdTool.randomString(5),
            cleanSession: true,
            // useSSL: false,
            useSSL: true,
            keepAliveInterval: 30,
            onSuccess: (event: any) => {
                IdLog.log('MQTT连接成功', event);
            },
            onFailure: (event: any) => {
                IdLog.log('MQTT连接失败', event);
            }
        };
    }

    /**
     * 订阅配置生成
     */
    protected mqttSub = () => {
        return {
            qos: 1,
            onSuccess: (event: any) => {
                IdLog.log('MQTT订阅成功', event);
            }
        };
    }
    /**
     * 生成连接客户端
     * @param clientId 客户端ID，连接唯一标识，保持唯一性
     * @param onMessageArrived 订阅消息到达监听回调
     * @param onConnectLost 连接丢失监听回调
     * @param onMessageDelivered 消息发布投递完成回调
     */
    protected getClient(clientId?: string, onMessageArrived?: any, onConnectLost?: any, onMessageDelivered?: any): Paho.MQTT.Client {
        const conf = this.mqttServer();
        if (clientId) {
            conf.clientId = clientId;
        }
        IdLog.log('MQQ client config ', conf);
        let client;
        if (this.mUrlConnect) {
            client = new Paho.MQTT.Client(conf.url, conf.clientId);
        } else {
            client = new Paho.MQTT.Client(conf.host, conf.port, conf.path, conf.clientId);
        }
        if (onMessageArrived) {
            client.onMessageArrived = onMessageArrived;
        }
        if (onConnectLost) {
            client.onConnectionLost = onConnectLost;
        }
        if (onMessageDelivered) {
            client.onMessageDelivered = onMessageDelivered;
        }

        return client;
    }

    /**
     * 连接MQTT服务器
     * @param client MQTT 客户端
     * @param onSuccess 连接成功回调
     * @param onFail 连接失败回调
     * @param user MQTT 连接用户名
     * @param pwd MQTT 连接密码
     */
    protected connect(client: Paho.MQTT.Client, user?: string, pwd?: string, onSuccess?: any, onFail?: any) {
        if (!client) {
            IdLog.error('connect MQTT客户端为空！');
            return;
        }
        if (client.isConnected()) {
            IdLog.warn('connect MQTT客户端不能重复连接');
            return;
        }
        const conf = this.mqttConnect();
        if (user) {
            conf.userName = user;
        }
        if (pwd) {
            conf.password = pwd;
        }
        if (onSuccess) {
            conf.onSuccess = onSuccess;
        }
        if (onFail) {
            conf.onFailure = onFail;
        }
        client.connect(conf);
    }

    /**
     * 订阅消息
     * @param client MQTT 客户端
     * @param topic 订阅主题
     * @param subscribeOptions 订阅配置
     */
    protected _subscribe(client: Paho.MQTT.Client, topic: string, subscribeOptions?: any) {
        if (!client || !client.isConnected()) {
            IdLog.warn('subscribe MQTT客户端连接不正常');
            return;
        }
        if (!subscribeOptions) {
            subscribeOptions = this.mqttSub();
        }
        client.subscribe(topic, subscribeOptions);
    }

    /**
     * 订阅消息
     * @param client MQTT 客户端
     * @param topic 订阅主题
     * @param subscribeOptions 订阅配置
     */
    protected _unsubscribe(client: Paho.MQTT.Client, topic: string, subscribeOptions?: any) {
        if (!client || !client.isConnected()) {
            IdLog.warn('unsubscribe MQTT客户端连接不正常');
            return;
        }
        if (!subscribeOptions) {
            subscribeOptions = this.mqttSub();
        }
        client.unsubscribe(topic, subscribeOptions);
    }

    /**
     * 消息发布
     * @param client MQTT 客户端
     * @param topic 发布主题
     * @param message 消息内容
     * @param qos 消息级别
     * @param retained 是否保存离线
     */
    protected _publish(client: Paho.MQTT.Client, topic: string, message: string, qos = 0, retained = false) {
        if (!client || !client.isConnected()) {
            IdLog.warn('publish MQTT客户端连接不正常');
            return;
        }
        const msg: Paho.MQTT.Message = new Paho.MQTT.Message(message);
        msg.destinationName = topic;
        msg.retained = retained;
        msg.qos = qos;
        client.send(msg);
    }
    /**
     * 断开客户端连接
     * @param client MQTT 客户端
     */
    protected _disconnect(client: Paho.MQTT.Client) {
        if (!client || !client.isConnected()) {
            IdLog.warn('disconnect MQTT客户端已经断开');
            return;
        }
        client.disconnect();
    }
}
