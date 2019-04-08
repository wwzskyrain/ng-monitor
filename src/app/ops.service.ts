import { Injectable } from '@angular/core';
import { Ops } from './model/opsItem';

@Injectable({
  providedIn: 'root'
})
export class OpsService {

  public ops: Ops;

  constructor() {
    this.ops = new Ops();
    this.ops.realName = '未知用户';
    this.ops.userName = 'unknow';
    this.ops.mail = 'unknow@ximalaya.com';
  }
}
