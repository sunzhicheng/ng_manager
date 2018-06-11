import { EnvConfig } from '../../../../../tools/env/env-config.interface';

export const Config: EnvConfig = JSON.parse('<%= ENV_CONFIG %>');

export const isDebug = true;
export const LJSY_NAV_ID = 'LJSY_NAV_ID';
export const YYKZJ_NAV_ID = 'YYKZJ_NAV_ID';
export const ZLZJ_NAV_ID = 'ZLZJ_NAV_ID';
export const WYQ_NAV_ID = 'WYQ_NAV_ID';
export const DZQK_NAV_ID = 'DZQK_NAV_ID';
export const XDZJ_NAV_ID = 'XDZJ_NAV_ID';

//export const BASE_URL = 'http://ibmsresty.idorp.org:5551/ibms/api/v1/idorp';
export const BASE_URL = 'http://resty.ibms.com/ibms/api/v1/idorp';
// export const BASE_URL =
// 'http://zsfresty.idorp.org:5551/zsfresty/api/v1/idorp'; export const BASE_URL
// = 'http://127.0.0.1:8080/ibmsresty/api/v1/idorp';

export const SERVER_URL_FILE = BASE_URL + '/sys';
export const SERVER_URL = BASE_URL;

export const COMMON_FILE = '/file/load/'; //加载普通文件后跟动态ID
export const COMMON_FILE_UP = '/file/upload'; //文件上传
export const WEB_FILE_UP = '/file/kindeditor/upload'; //文件上传

export const USER_BASE_URL = '/sys/sys/admin'; //用户接口
export const USER_INIT = ''; //初始会话 直接空参数 POST 接口地址
export const USER_CODE = '/captcha'; //获取验证码GET
export const USER_LOGIN = '/login'; //登陆
export const USER_FUNS = '/funs'; //所有权限
export const USER_CHECK_TOKEN = '/checktoken'; //验证token
export const USER_LIST = '/list'; //验证token
export const USER_add = '/add'; //验证token
export const USER_UPDATE = '/update'; //验证token
export const USER_DEL = '/del'; //验证token
export const USER_DETAIL = '/detail'; //验证token
export const USER_ALLLIST = '/alllist'; //列表
export const USER_BIND_ROLES = '/userBindRoles'; //列表
export const USER_DEPART = '/depart_user_list'; //列表
export const USER_DEPART_DEL = '/depart_user_del'; //列表
export const USER_DEPART_BIND = '/depart_bind_users'; //列表

export const ROLE_BASE_URL = '/sys/sys/role'; //角色接口
export const ROLE_ADD = '/add'; //新增
export const ROLE_UPDATE = '/update'; //修改
export const ROLE_LIST = '/list'; //列表
export const ROLE_DETAIL = '/detail'; //列表
export const ROLE_DEL = '/del'; //列表
export const ROLE_MENU = '/menu'; //菜单列表
export const ROLE_GROUP_ROLE = '/roleBindGroup'; //权限绑定功能组

export const COMPANY_BASE_URL = '/company'; //公司接口
export const COMPANY_ADD = '/add';
export const COMPANY_UPDATE = '/update';
export const COMPANY_LIST = '/list';

export const CLIENT_USER_BASE_URL = '/user'; //用户
export const CLIENT_USER_LIST = '/list';
export const CLIENT_USER_ADD = '/add';
export const CLIENT_USER_UPDATE = '/update';
export const CLIENT_USER_DELETE = '/del';
export const CLIENT_USER_INFO = '/info';
export const CLIENT_USER_SELECT = '/select';

export const DEPT_BASE_URL = '/sys/sys/dept'; //部门管理
export const DEPT_LIST = '/list';
export const DEPT_Tree = '/list_tree';
export const DEPT_ADD = '/add';
export const DEPT_UPDATE = '/update';
export const DEPT_DELETE = '/del';
export const DEPT_DETAIL = '/detail';
export const DEPT_ATTENDANCE = '/conf/att';
export const DEPT_ATTENDANCE_AREA = '/conf/area';
export const DEPT_ATTENDANCE_TIME = '/conf/time';
export const DEPT_LEAVEAPPLY = '/conf/la';
export const DEPT_SELECT = '/select';

export const AIC_BASE_URL = '/aic'; //AIC管理
export const IAC_TREE = '/tree'; //功能组 树形结构    用于增删改查
export const AIC_ADD = '/add';
export const AIC_DEL = '/del';
export const AIC_UPDATE = '/update';

export const FUN_BASE_URL = '/sys/sys/func'; //AIC管理
export const FUNC_LIST = '/list';
export const FUNC_ADD = '/add';
export const FUNC_UPDATE = '/update';
export const FUNC_DEL = '/del';
export const FUNC_DETAIL = '/detail';

export const GROUP_BASE_URL = '/sys/sys/group';
export const GROUP_ADD = '/add';
export const GROUP_UPDATE = '/update';
export const GROUP_DEL = '/del';
export const GROUP_LIST = '/list';
export const GROUP_DETAIL = '/detail';
export const GROUP_TREE = '/group_tree';

export const AIC_SW_SM_MANAGER = '/mch/sm';
export const AIC_SW_SM_MANAGER_QUERY = '/query';
export const AIC_SW_SM_MANAGER_ADD = '/add';
export const AIC_SW_SM_MANAGER_UPDATE = '/update';
export const AIC_SW_SM_MANAGER_DETAIL = '/details';

export const AIC_SW_SM_COMPANY_MANAGER = '/company';
export const AIC_SW_SM_COMPANY_QUERY = '/query';
export const AIC_SW_SM_COMPANY_ADD = '/add';
export const AIC_SW_SM_COMPANY_DETAIL = '/details';
export const AIC_SW_SM_COMPANY_UPDATE = '/update';
export const AIC_SW_SM_COMPANY_DEL = '/del';

//公司选择项查询
export const AIC_SYS_WEB_COMPANY = '/qt/web/companyopt';
export const AIC_SYS_WEB_COMPANY_QUERY = '/opt/list';

//商家查询
export const AIC_SP_WEB_MERCHANT = '/qt/web/merchant';
export const AIC_SP_WEB_MERCHANT_QUERY = '/list';

export const AIC_SP_WEB_MERCHANT_ROLE = '/qt/web/companytype';
export const AIC_SP_WEB_MERCHANT_ROLE_OPT_QUERY = '/opt_list';

//LOG
export const LOG_BASE_URL = '/sys/sys/log';
export const LOG_LIST = '/list';
export const LOG_DETAIL = '/detail';

//环卫局管理
export const MC_BASE_URL = '/sf/web/company';
export const MC_LIST = MC_BASE_URL + '/list';
export const MC_ADD = MC_BASE_URL + '/add';
export const MC_UPDATE = MC_BASE_URL + '/update';
export const MC_DEL = MC_BASE_URL + '/del';
export const MC_DETAIL = MC_BASE_URL + '/detail';
export const MC_ALLMERLIST = MC_BASE_URL + '/all_mer_list';
export const MC_OPTLIST = MC_BASE_URL + '/opt_list';

//错误日志
export const ERROE_LOG_BASE_URL = '/sf/web/error/log';
export const ERROE_LOG_LIST = ERROE_LOG_BASE_URL + '/list';
export const ERROE_LOG_DETAIL = ERROE_LOG_BASE_URL + '/detail';

export const APP_VERSION_BASE_URL = '/sf/appversion';
export const APP_VERSION_LIST = APP_VERSION_BASE_URL + '/list';
export const APP_VERSION_ADD = APP_VERSION_BASE_URL + '/add';
export const APP_VERSION_DETAIL = APP_VERSION_BASE_URL + '/detail';
export const APP_VERSION_DEL = APP_VERSION_BASE_URL + '/del';

//IBMS
export const AIC_BUILDING = '/ibms/web/ibmsBuilding';
export const AIC_BUILDING_QUERY = '/list';
export const AIC_BUILDING_ADD = '/add';
export const AIC_BUILDING_UPDATE = '/update';
export const AIC_BUILDING_DELETE = '/del';
export const AIC_BUILDING_DETAIL_QUERY = '/detail';
export const AIC_BUILDING_QUERY_OPT = '/listOpt';

//IBMS视频分布AIC
export const AIC_VIDEO_LAYOUT = '/ibms/web/ibmsVideoLayOut';
export const AIC_VIDEO_LAYOUT_QUERY = '/list';
export const AIC_VIDEO_LAYOUT_ADD = '/add';
export const AIC_VIDEO_LAYOUT_DETAIL_QUERY = '/detail';
export const AIC_VIDEO_LAYOUT_UPDATE = '/update';
export const AIC_VIDEO_LAYOUT_DEL = '/del';
export const AIC_WEB_CONTROL_LIST = '/listcontrolDetail';
export const AIC_WEB_CONTROL_DETAIL = '/controlDetail';
export const AIC_WEB_CONTROL_UPDATE = '/updateControl';
export const AIC_WEB_CONTROL_DEL = '/delControl';
export const AIC_WEB_DEVICE_DETAIL = '/deviceDetail';
export const AIC_WEB_VIDEO_EJECT_LIST = '/ejectList';
export const AIC_WEB_VIDEO_FAULT_LIST = '/faultList';
export const AIC_WEB_VIDEO_SAVE_ADD = '/addVideoSave';
export const AIC_WEB_VIDEO_SAVE_List = '/videoSaveList';
export const AIC_WEB_VIDEO_SAVE_DELETE = '/delVideoSave';
export const AIC_WEB_FAULTHISTORY_LIST = '/faultHistoryList';
export const AIC_WEB_FAULTHISTORY_DETAIL = '/faultHisDetail';
export const AIC_WEB_FAULTHISTORY_OPERATION = '/operation';

//平台管理
export const AIC_PLATFORM = '/ibms/web/platform';
export const AIC_PLATFORM_COUNT = AIC_PLATFORM + '/count';
export const AIC_PLATFORM_SUBCOUNT = AIC_PLATFORM + '/subcount';
export const AIC_PLATFORM_LIST = AIC_PLATFORM + '/list';
export const AIC_PLATFORM_ADD = AIC_PLATFORM + '/add';
export const AIC_PLATFORM_DETAIL = AIC_PLATFORM + '/detail';
export const AIC_PLATFORM_UPDATE = AIC_PLATFORM + '/update';
export const AIC_PLATFORM_DEL = AIC_PLATFORM + '/del';
export const AIC_PLATFORM_SYNC = AIC_PLATFORM + '/sync';

//数据字典
export const AIC_PLATFORM_DICT = '/ibms/web/platform/dict';
export const AIC_PLATFORM_DICT_LIST = AIC_PLATFORM_DICT + '/list';
export const AIC_PLATFORM_DICT_ADD = AIC_PLATFORM_DICT + '/add';
export const AIC_PLATFORM_DICT_UPDATE = AIC_PLATFORM_DICT + '/update';
export const AIC_PLATFORM_DICT_DEL = AIC_PLATFORM_DICT + '/del';
export const AIC_PLATFORM_DICT_DETAIL = AIC_PLATFORM_DICT + '/detail';

//数据字典参数值
export const AIC_PLATFORM_DICT_VALUE = '/ibms/web/platform/dict/value';
export const AIC_PLATFORM_DICT_VALUE_LIST = AIC_PLATFORM_DICT_VALUE + '/list';
export const AIC_PLATFORM_DICT_VALUE_ADD = AIC_PLATFORM_DICT_VALUE + '/add';
export const AIC_PLATFORM_DICT_VALUE_UPDATE = AIC_PLATFORM_DICT_VALUE + '/update';
export const AIC_PLATFORM_DICT_VALUE_DEL = AIC_PLATFORM_DICT_VALUE + '/del';
export const AIC_PLATFORM_DICT_VALUE_DETAIL = AIC_PLATFORM_DICT_VALUE + '/detail';

//同步设备
export const AIC_WEB_VIDEO_DEVICE = '/ibms/web/videoDevice';
export const AIC_WEB_VIDEO_DEVICE_QUERY = '/listOpt';
export const AIC_WEB_VIDEO_CONTROL_QUERY = '/listControlOpt';

export const MSGSYS_BASE_URL = '';
export const MSGSYS_LIST_INDEX = '';

export const COM_TOKEN_INIT: any = {
  acc_token: {},
  ext: {
    user_id: {}
  }
};

export const TOKEN_INIT: any = {
  token: COM_TOKEN_INIT
};

export const COM_PAGER_INIT: any = {
  pm: 2,
  pageNo: 1,
  pagePerCount: 10,
  totalCount: 0,
  hg: 2
};

export const TOKEN_PAGER_INIT: any = {
  token: COM_TOKEN_INIT,
  pager: COM_PAGER_INIT
};

export const COM_PAGER_EJECT_INIT: any = {
  pm: 2,
  pageNo: 1,
  pagePerCount: 9,
  totalCount: 0,
  hg: 2
};

export const QZ_MCH_SM_INIT: any = {
  query_ext: {
    user_id: {}
  },
  user_company_id: {
    user: {
      pt_id: {},
      account_ext: {}
    },
    uc_list: []
  }
};

// 数据状态
export const COM_SQL_STATUS_OPT: any = [
  {
    key: {
      l_id: 0
    },
    value: {
      open_id: '全部'
    },
    selected: true
  }, {
    key: {
      l_id: 1
    },
    value: {
      open_id: '正常'
    }
  }, {
    key: {
      l_id: 2
    },
    value: {
      open_id: '禁用'
    }
  }
];

export const COM_SQL_DEVICE_STATE: any = [
  {
    key: {
      l_id: 0
    },
    value: {
      open_id: '状态-全部'
    }
  }, {
    key: {
      l_id: 1
    },
    value: {
      open_id: '未激活'
    }
  }, {
    key: {
      l_id: 2
    },
    value: {
      open_id: '运行中'
    }
  }, {
    key: {
      l_id: 3
    },
    value: {
      open_id: '故障中'
    }
  }, {
    key: {
      l_id: 4
    },
    value: {
      open_id: '报警中'
    }
  }, {
    key: {
      l_id: 5
    },
    value: {
      open_id: '失联中'
    }
  }
];

export const COM_QEX: any = {
  q_item_list: []
};
//app 版本类型
export const APP_VERSION_OPT: any = [
  {
    key: {
      l_id: 0
    },
    value: {
      open_id: '全部'
    },
    selected: true
  }, {
    key: {
      l_id: 1
    },
    value: {
      open_id: '海报广告'
    }
  }, {
    key: {
      l_id: 2
    },
    value: {
      open_id: '轮播广告'
    }
  }, {
    key: {
      l_id: 3
    },
    value: {
      open_id: '视频广告'
    }
  }
];

// export const QZ_PROTO_UserCategory: any =
// require('../../../js/protobufjs/QzUser.js')['qz']['UserCategory'];
