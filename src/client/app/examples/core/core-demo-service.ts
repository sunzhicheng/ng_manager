import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToolGpbService, ToolHttpService } from '../../shared/tool/index';

import { SERVER_URL, USER_BASE_URL, USER_LOGIN, USER_CODE } from '../../shared/config/env_qz.config';

@Injectable()
export class CoreDemoService {
    random: any = 1;

    constructor( private toolHttp: ToolHttpService,
        private toolGpb: ToolGpbService) {
        // console.log('loginService constructor...');
    }

    /**
     * 生成验证码
     */
    getCaptcha() {
        return SERVER_URL + USER_BASE_URL + USER_CODE + '/' + this.toolHttp.session + '?' + (this.random++);
    }

    /**
     * 登陆 测试帐号 admin / 123456
     * @param userEntry 提交参数
     * @param protoMessage 协议类型
     */
    login(userEntry: any, protoMessage: any): Observable<any> {
        //添加 sessionId
        this.toolHttp.addSessionId(userEntry);
        return this.toolHttp.ajaxJson2(userEntry, (USER_BASE_URL + USER_LOGIN), protoMessage);
    }
}
