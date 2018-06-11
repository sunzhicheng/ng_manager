import { Component, OnInit } from '@angular/core';
import { CoreDemoService } from './core-demo-service';

@Component({
    moduleId: module.id,
    selector: 'sd-core-demo',
    templateUrl: 'core-demo.component.html',
  })

/**
 * IDORP Angular core component demo
 */
export class CoreDemoComponent implements OnInit {

    // 动态验证码
    captcha: string;

    constructor(private coreDemoService: CoreDemoService) {
        console.log('CoreDemoComponent constructor');
    }

    ngOnInit(): void {
        console.log('CoreDemoComponent ngOnInit');

        // 演示 Google Protobuf 使用
        this.getCaptcha();
    }

    getCaptcha() {
        this.captcha = this.coreDemoService.getCaptcha();
    }

    refreshCaptcha() {
        this.getCaptcha();
    }
}
