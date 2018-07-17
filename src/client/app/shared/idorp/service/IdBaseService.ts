import { Observable } from 'rxjs';
import { GpbService } from './gpb.service';

export class DyBaseService {

    /**
     * 数据接口定义
     */
    public api: any = {
        base: '',
        query: '',
        proto: ''
      };

    constructor(public toolGpb: GpbService) {
    }

    /**
     * 获取接口协议类
     */
    getProtoEntry(): Observable<any> {
        return Observable.create((observer: any) => {
            this.toolGpb.getProto(this.api.proto).subscribe(
                (message: any) => observer.next(message),
                (error: any) => observer.error(error)
            );
        });
    }

}
