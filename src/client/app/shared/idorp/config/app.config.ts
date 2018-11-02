import { API_PRO } from './api_pro_config';
import { API_TEST } from './api_test_config';
import { API_DEV } from './api_dev_config';

// 根据此值使用对应 API
export const API_DEBUG = true;

// APP 协议路径
export const APP_PROTO_PATH_SYS = 'assets/protobuf/SysAll.json';

//idmall路径
export const APP_PROTO_PATH_MALL = 'assets/protobuf/ShopAll.json';

//nlk协议路径
export const APP_PROTO_PATH_NLK = 'assets/protobuf/NlkAll.json';
//nlk协议路径
export const APP_PROTO_PATH_WX = 'assets/protobuf/WxAll.json';


export const APP_PROTO_PATH_ALIPAY = 'assets/protobuf/AlipayAll.json';

// API 请求方式
export enum HTTPREQ {
    GET,
    POST
}


// 分页请求初始化数据
export const PAGER_INIT = {
        pm: 2,
        pageNo: 1,
        hg: 0,
        pagePerCount: 10,
        ext: {
            sort: 0,
            sortCol: 0,
            sort_head: {
                h_identity: 0
            }
        }
};

export const COM_TOKEN_INIT: any = { acc_token: {}, ext: { user_id: {} } };
export const TOKEN_INIT: any = { token: COM_TOKEN_INIT };

export const ID_HOST_PRO = 'm.naliangkuai.com';
export const ID_HOST_TEST = 'mtest.naliangkuai.com';

let idconf: any;
export const IDCONF: any = () => {
    if (!idconf) {
      const host =  document.domain || window.location.host;
      console.log('ID_CONF : ', host);
      if (ID_HOST_PRO === host) {
          idconf = API_PRO;
      } else if (ID_HOST_TEST === host) {
          idconf = API_TEST;
      } else {
        idconf = API_DEV;
      }
    }
    return idconf;
};

export const platform_name = '哪凉快';
export const platform_operate_name = '运营管理平台';
export const platform_business_name = '商户管理平台';

