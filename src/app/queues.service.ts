import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { QueueItemGroup } from './model/queueItem';

@Injectable({
  providedIn: 'root'
})
export class QueuesService {

  // 更新迁移队列
  private queueEventSource = new Subject<QueueItemGroup[]>();
  public  queueEventSource$ = this.queueEventSource.asObservable();

  // 刷新business的队列和app的队列
  private refreshEventSource = new Subject<boolean>();
  public refreshEventSource$ = this.refreshEventSource.asObservable();

  private refershAppNames = new Subject<string[]>();
  public refershAppNames$ = this.refershAppNames.asObservable();

  constructor() { }

  fireQueueGroup(e: QueueItemGroup[]) {
    this.queueEventSource.next(e);
  }

  fireRefreshEvent() {
    this.refreshEventSource.next(true);
  }

  fireAppNameRefreshedEvent(appNames: string[]) {
    this.refershAppNames.next(appNames);
  }
}
