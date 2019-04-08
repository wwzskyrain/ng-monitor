import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { QueueItemGroup } from './model/queueItem';

@Injectable({
  providedIn: 'root'
})
export class QueuesService {

  private queueEventSource = new Subject<QueueItemGroup[]>();
  public  queueEventSource$ = this.queueEventSource.asObservable();

  private refreshAppPageSource = new Subject<number>();
  public refreshAppPageSource$ = this.refreshAppPageSource.asObservable();

  constructor() { }

  fireQueueGroup(e: QueueItemGroup[]) {
    this.queueEventSource.next(e);
  }

  fireRefreshAppPage() {
    this.refreshAppPageSource.next(0);
  }
}
