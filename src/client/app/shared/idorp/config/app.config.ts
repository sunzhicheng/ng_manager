// 根据此值使用对应 API
export const API_DEBUG = true;

// APP 协议路径
export const APP_PROTO_PATH = 'assets/protobuf/SysAll.json';
// API 请求方式
export enum HTTPREQ {
    GET,
    POST
}


// 分页请求初始化数据
export const PAGER_INIT = {
    pager: {
        pm: 2,
        pageNo: 0,
        hg: 0,
        ext: {
            sort: 0,
            sortCol: 0,
            sort_head: {
                h_identity: 0
            }
        }
    }
};
