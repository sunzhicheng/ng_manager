import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { IdTool } from '../tool/IdTool';
import { DyBaseService } from './IdBaseService';
import { GpbService } from './gpb.service';
import { HttpService } from './HttpService';


/**
 * Utils类存放和业务无关的公共方法
 * @description
 */
@Injectable()
export class TreeService extends DyBaseService {
    //已经被选择的集合
    checkeds: any;
    name_key: string; //用来获取子集的JSON key
    uuid_key: string; //用来获取父UUID 的 JSON key
    sub_key: string; //用来获取名称的  JSON key

    parent_key: string;
    isAsync = false;

    constructor(public toolGpb: GpbService,
        public httpService: HttpService) {
        super(toolGpb, httpService);
    }
    /**
     * 设置node  和 协议路径的映射  从proto 开始
     * @param name_key
     * @param uuid_key
     * @param sub_key
     */
    setMappingKey(name_key: string, uuid_key: string, sub_key: string, parent_key = 'parent_id') {
        this.name_key = name_key;
        this.uuid_key = uuid_key;
        this.sub_key = sub_key;
        this.parent_key = parent_key;
    }
    setAsync(isAsync: any, ) {
        this.isAsync = isAsync;
    }
    /**
     * 对象list  转成 数结构list
     * @param proto_list 对象集合
     * @param openIndex 允许默认打开的跟节点  0表示所有都不打开  9999 表示所有都打开
     * @param checkeds 已经选择的菜单,默认进入勾选状态
     */
    toTreeData(proto_list: any, openIndex: any = 9999, checkeds: any = '', defaultOpen: boolean = false) {
        if (!this.name_key) {
            console.warn('ztee.node 和 协议的映射关系为设置，name_key将采用默认设置: name');
        }
        if (!this.uuid_key) {
            console.warn('ztee.node 和 协议的映射关系为设置，uuid_key将采用默认设置: dtc.pt_id.open_id');
        }
        if (!this.sub_key) {
            console.warn('ztee.node 和 协议的映射关系为设置，sub_key将采用默认设置: sub_list');
        }
        this.checkeds = checkeds;
        const tData: any = [];
        if (proto_list && proto_list.length > 0) {
            this.checkProto(proto_list[0]);
            proto_list.forEach((proto: any) => {
                let isOpen = defaultOpen;
                if (openIndex === 9999 || openIndex >= 1) {
                    isOpen = true;
                }
                let isChecked = false;
                const uuid = IdTool.getJson(proto, this.uuid_key || 'dtc.pt_id.open_id', '');
                if (this.checkeds && this.checkeds.indexOf(uuid) !== -1) {
                    isChecked = true;
                }
                const node = this.proto2Node(proto, 0, isOpen, isChecked);
                tData.push(node);
                this.getSubNode(proto, tData, openIndex);
            });
        }
        return tData;
    }

    /**
     *  协议对象转数节点node 通用写法  ,可以子类覆盖
     */
    proto2Node(proto: any, pId: any, isOpen: boolean = true, isChecked: boolean = false) {
        const subList = _.get(proto, this.sub_key || 'sub_list');
        const node = {
            id: IdTool.getJson(proto, this.uuid_key || 'dtc.pt_id.open_id', ''),
            pId: pId,
            name: IdTool.getJson(proto, this.name_key || 'name', ''),
            isParent: subList && subList.length > 0 ? true : false,
            open: isOpen,
            checked: isChecked,
        };
        return node;
    }
    /**
     * 获取所以子节点   协议对象子类集合  建议统一用sub_list
     * @param superItem
     * @param tree_arr
     */
    getSubNode(superItem: any, tree_arr: any, openIndex: any = 9999, index: any = 2) {
        if (superItem[this.sub_key || 'sub_list'] && superItem[this.sub_key || 'sub_list'].length > 0) {
            for (const i in superItem[this.sub_key || 'sub_list']) {
                const proto: any = superItem[this.sub_key || 'sub_list'][i];
                let isChecked = false;
                const uuid = IdTool.getJson(proto, this.uuid_key || 'dtc.pt_id.open_id', '');
                if (this.checkeds && this.checkeds.indexOf(uuid) !== -1) {
                    isChecked = true;
                }
                let isOpen = false;
                if (openIndex === 9999 || index <= openIndex) {
                    isOpen = true;
                }
                const node = this.proto2Node(proto,
                    IdTool.getJson(superItem, this.uuid_key || 'dtc.pt_id.open_id', ''),
                    isOpen, isChecked);
                tree_arr.push(node);
                this.getSubNode(proto, tree_arr, openIndex, index + 1);
            }
        }
    }

    checkProto(proto: any) {
        if (this.name_key && !_.has(proto, this.name_key)) {
            console.warn('你确认name_key是否正确,检测到对象不存在该属性:' + this.name_key);
        }
        if (this.uuid_key && !_.has(proto, this.uuid_key)) {
            console.warn('你确认uuid_key是否正确,检测到对象不存在该属性:' + this.uuid_key);
        }
        if (!this.isAsync && this.sub_key && !_.has(proto, this.sub_key)) {
            console.warn('你确认sub_key是否正确,检测到对象不存在该属性:' + this.sub_key);
        }
        if (this.isAsync && this.parent_key && !_.has(proto, this.parent_key)) {
            console.warn('你确认parent_key是否正确,检测到对象不存在该属性:' + this.parent_key);
        }
    }
    /**
     *  协议对象转数节点node  异步加载的时候使用
     */
    proto2NodeByAsync(proto: any) {
        if (proto) {
            this.checkProto(proto);
            const node = {
                id: IdTool.getJson(proto, this.uuid_key || 'dtc.pt_id.open_id', ''),
                pId: IdTool.getJson(proto, this.parent_key || 'parent_id', ''),
                name: IdTool.getJson(proto, this.name_key || 'name', ''),
                isParent: true,
            };
            return node;
        } else {
            return {};
        }
    }
}
