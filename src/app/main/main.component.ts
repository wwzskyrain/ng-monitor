import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NetworkService } from '../network.service';
import { QueueItem } from '../model/queueItem';
import { OpsService } from '../ops.service';
import { QueuesService } from '../queues.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isLoading = false;
  deadQueues: QueueItem[];

  constructor(public api: NetworkService,
    public opsService: OpsService,
    private queueService: QueuesService,
    private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.queueService.refreshEventSource$.subscribe(res => {
      this.forceQueryDeadQueue();
      this.cd.markForCheck();
    });

    this.queryDeadQueue();
    this.api.getOps().subscribe(res => {
      if (res.code === 0) {
        if (res.data.realName !== null) {
          this.opsService.ops = res.data;
        }
      } else {
        console.log(res);
      }
    });
  }

  refreshALL() {
    this.queueService.fireRefreshEvent();
  }

  forceQueryDeadQueue() {
    this.isLoading = true;
    this.api.forceQueryDeadQueue().subscribe(res => {
      this.isLoading = false;
      if (res.code === 0) {
        this.deadQueues = res.data;
      } else {
        console.log(res);
      }
    });
  }

  queryDeadQueue() {
    this.api.queryDeadQueue().subscribe(res => {
      if (res.code === 0) {
        this.deadQueues = res.data;
      } else {
        console.log(res);
      }
    });
  }

  cyrb53(str, seed = 0): string {
    if (str === 'may') {
      return 'blue';
    } else if (str === 'sh-nh-b2-3-q15-rabbitmq-9-24') {
      return 'orange';
    } else {
      return 'red';
    }
  }
}
