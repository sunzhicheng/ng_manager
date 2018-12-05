import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { of, fromEvent, interval, Observable, timer, forkJoin, combineLatest } from 'rxjs';
import { mergeMap, map, debounceTime, scan, distinctUntilChanged, mapTo, concatMap, concat, pairwise, switchMap } from 'rxjs/operators';
import { BaseComponent } from '../../shared/component/BaseComponent';
declare let $: any;


@Component({
    moduleId: module.id,
    selector: 'sd-idsysappacount',
    template: `
    <f-table-cmp  *ngIf="formData" [formData]="formData"
    (formSubmited)="formSubmit($event)" (loadDataOut)="loadData($event)" (updateOut)="update($event)"
    (delOut)="del($event)" (bindOut)="bind($event)"  [opt_config]="opt_config"
    (btnclickout)="btnClick($event)"
    [config]="{permissoinBase:'business:idsysappacount,operate:idsysappacount',maxLengthData:20}"
    >
    </f-table-cmp>

    <input type="text" id="rxjstest_input" />
    <button type="button"  class="btn btn-primary" id="rxjstest_button" >rxjstest</button>


    <from-modal [config]="{title:'demo表单弹出框'}"  (valueOut)="modalFormSubmit($event)"></from-modal>
    <modal-table [config]="{title:'demo表单弹出框',proto: 'idsys.IdSysBankEntry',request_url: '/idsys/web/idsysbank/query'}"
      (valueOut)="modalTableSubmit($event)"></modal-table>
    `
})

/**
 * demo模块
 */
export class DemoListComponent extends BaseComponent implements OnInit {


    ngOnInit(): void {
        this.log('');
    }

    beforeQuery() {
        this.log('搜索之前需要的业务需求');
    }

    getAllCheckedV(checked: string) {
        this.log('  getAllCheckedV: ' + checked);
    }

    rxjstest() {
        this.log('---------------------------------debounceTime-----------------------------------------------------');
        // const input = document.getElementById('rxjstest_input');
        // // 对于每次键盘敲击，都将映射成当前输入值
        // const example = fromEvent(input, 'keyup').pipe(map((i:any) => i.currentTarget.value));
        // // 在两次键盘敲击之间等待0.5秒方才发出当前值，
        // // 并丢弃这0.5秒内的所有其他值
        // const debouncedInput = example.pipe(debounceTime(500));
        // // 输出值
        // const subscribe = debouncedInput.subscribe(val => {
        //     console.log(`Debounced Input: ${val}`);
        // });
        this.log('---------------------------------------scan1-----------------------------------------------------');
        // 基础的 scan 示例，从0开始，随着时间的推移计算总数  acc 为上次的返回值(这里的返回值就是累加值)
        // const source = of(1, 2, 3);
        // const example = source.pipe(scan(
        //     (acc: any, curr: any, index: any) => {
        //         this.log('acc=' + acc + '   curr=' + curr + '   index=' + index);
        //         return acc + curr
        //     }, 1)
        // ).subscribe(val => console.log(val));
        this.log('-------------------------------------...操作符--------------------------------------------------------');
        //...把数组当成一个属性    数组动态赋值  arr = [...arr, index]   index作为值无论放前还是后都是在末尾插入
        // let arr: any = [];
        // for (let index = 0; index < 10; index++) {
        //     arr = [index, ...arr];
        // }
        // this.log('arr = ', arr);
        this.log('-----------------------------------scan2--------------------------------------------------------');
        //对每个流执行fuc 操作
        // const scanObs = interval(1000)
        //     .pipe(
        //         scan((a, c) => [...a, c], []),
        //         map((r: any) => {
        //             const index = Math.floor(Math.random() * r.length);
        //             this.log('r='+r+'     Math.floor(Math.random() * r.length) =' + index);
        //             return r[index];
        //         }),
        //         distinctUntilChanged()
        //     ).subscribe(val => console.log(val));
        this.log('------------------------------------concat---------------------------------------------------------');
        //concat  按顺序订阅 Observables，但是只有当一个完成并让我知道，然后才会开始下一个。当顺序很重要时，使用此操作符，例如当你需要按顺序的发送 HTTP 请求时。
        // const getPostOne = timer(3000).pipe(mapTo({ id: 1 }));
        // const getPostTwo = timer(1000).pipe(mapTo({ id: 2 }));
        // getPostOne.pipe(concat(getPostTwo)).subscribe(res => console.log(res));
        this.log('-------------------------------------forkJoin------------------------------------------------------');
        //forkJoin 直到所有的 Observables 都完成了，然后再一次性的给我所有的值。(以数组的形式)
        // const getPostOne = timer(3000).pipe(mapTo({ id: 1 }));
        // const getPostTwo = timer(1000).pipe(mapTo({ id: 2 }));
        // forkJoin(getPostOne, getPostTwo).subscribe(res => console.log(res))
        this.log('-------------------------------------mergeMap------------------------------------------------------');
        // 首先，我们得理解 Observables 世界中的两个术语:
        // 源(或外部) Observable - 在本例中就是 post$ Observable 。
        // 内部 Observable - 在本例中就是 getPostInfo$ Observable 。
        // 仅当内部 Obervable 发出值时，通过合并值到外部 Observable 来让我知道。 （这里的id:1 丢失掉了？？）
        // const post$ = of({ id: 1 });
        // const getPostInfo$ = timer(3000).pipe(mapTo({ title: "Post title" }));
        // const posts$ = post$.pipe(mergeMap(post => getPostInfo$)).subscribe((res: any) => {
        //     console.log(res)
        // });
        this.log('-------------------------------------pairwise------------------------------------------------------');
        //pairwise  将前一个值和当前值作为数组发出
        // fromEvent(document, 'scroll').pipe(
        //     map(e => window.pageYOffset),
        //     pairwise(),
        // ).subscribe(pair => console.log(pair)); // pair[1] - pair[0]
        this.log('-------------------------------------switchMap-------------------------------------------------');
        // 类似于 mergeMap，但是当源 Observable 发出值时会取消内部 Observable 先前的所有订阅 。
        // 在我们的示例中，每次我点击页面的时，先前的 interval 订阅都会取消，然后开启一个新的。
        // const clicks$ = fromEvent(document.querySelector('#rxjstest_button'), 'click');
        // const innerObservable$ = interval(1000);
        // clicks$.pipe(switchMap(event => innerObservable$))
        //     .subscribe(val => console.log(val));
        this.log('-------------------------------------combineLatest-------------------------------------------------');
        // 当任意 Observable 发出值时让我知道，但还要给我其他 Observalbes 的最新值。(以数组的形式)
        const intervalOne$ = interval(1000);
        const intervalTwo$ = interval(2000);
        combineLatest(
            intervalOne$,
            intervalTwo$
        ).subscribe(all => console.log(all));

    }
}

