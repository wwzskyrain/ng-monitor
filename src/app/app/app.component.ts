import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NetworkService } from '../network.service';
import { AppItem } from '../model/appItem';
import { QueuesService } from '../queues.service';
import { QueueItemGroup } from '../model/queueItem';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppQueueComponent implements OnInit {
  displayApps: AppItem[];
  apps: AppItem[];
  appNameFilter: string;
  appOptions: string[];
  queryAllQueue = true;

  constructor(public api: NetworkService,
    private queueService: QueuesService,
    private cd: ChangeDetectorRef) {
    this.appNameFilter = '';
    this.queueService.refreshAppPageSource$.subscribe(_ => {
      this.refresh();
      this.cd.markForCheck();
    });
  }

  xdcsLink(appName) {
    return `http://xdcs.ximalaya.com/app_info?app_name=${appName}`;
  }

  onAppNameFilterChanged(e) {
    console.log(e);

    if (this.appNameFilter === undefined || this.appNameFilter === null) {
      this.appNameFilter = '';
    }

    console.log(this.appNameFilter);
    this.displayApps = this.apps.filter(app => app.appName.indexOf(this.appNameFilter) >= 0);
  }

  refresh() {
    const callback = (res => {
      if (res.code === 0) {
        this.apps = res.data;
        this.apps.forEach(app => app.expand = false);
        this.appOptions = this.apps.map(app => app.appName);
        this.onAppNameFilterChanged(this.appNameFilter);
        this.notifyDeadQueueChanged();
      } else {
        console.log(res);
      }
    });

    if (this.queryAllQueue) {
      this.api.queryAllDeadQueue().subscribe(callback);
    } else {
      this.api.queryAllDeadQueueByOps().subscribe(callback);
    }
  }

  onChange(e) {
    console.log(e);
  }

  notifyDeadQueueChanged() {
    const deadQueueGroups = [];
    this.apps.forEach(app => {
      app.queueInfoList.forEach(
        q => {
          const group = deadQueueGroups.find(g => g.host === q.host);
          if (group == null) {
            deadQueueGroups.push(new QueueItemGroup(q.host, [q]));
          } else {
            group.queues.push(q);
          }
        });
    });
    this.queueService.fireQueueGroup(deadQueueGroups);
  }

  ngOnInit() {
    this.refresh();
  }

  sort(sf: { key: string, value: string }, app: AppItem) {
    if (sf.key && sf.value) {
      const sortfun = function (a, b) {
        if (sf.value === 'ascend') {
          return (a[sf.key] > b[sf.key] ? 1 : -1);
        } else {
          return (b[sf.key] > a[sf.key] ? 1 : -1);
        }
      };
      app.queueInfoList = [...app.queueInfoList.sort(sortfun)];
    }
  }
}
