import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../network.service';
import { QueueItem } from '../model/queueItem';
import { OpsService } from '../ops.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  deadQueues: QueueItem[];

  constructor(public api: NetworkService, public opsService: OpsService) {
  }

  ngOnInit() {
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

  forceQueryDeadQueue() {
    this.api.forceQueryDeadQueue().subscribe(res => {
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
