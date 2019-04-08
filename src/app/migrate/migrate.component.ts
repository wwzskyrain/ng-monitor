import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { NetworkService } from '../network.service';
import { QueueItem, QueueItemGroup } from '../model/queueItem';
import { MigrateItem } from '../model/migrateItem';
import { LResponse } from '../model/response';
import { ExchangeItem } from '../model/exchangeItem';
import { ExchangeBindItem } from '../model/exchangeBindItem';
import { NzMessageService } from 'ng-zorro-antd';
import { QueuesService } from '../queues.service';

@Component({
  selector: 'app-migrate',
  templateUrl: './migrate.component.html',
  styleUrls: ['./migrate.component.css']
})
export class MigrateComponent implements OnInit, OnDestroy {
  deadQueueGroups: QueueItemGroup[];
  exchanges: ExchangeItem[];
  migrateTasks: MigrateItem[];
  shouldCheckUpdate: boolean;
  migrateFromQueue: QueueItem;
  migrateToExchange: string;
  exchangeHost: string;
  selectExchange: ExchangeItem;
  bindInfo: ExchangeBindItem[];
  routingKey: string;
  consumSpeed = 1;
  errorMsg: string;
  timer: any;

  constructor(public api: NetworkService,
    private message: NzMessageService,
    private queueService: QueuesService,
    private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.deadQueueGroups = [];
    this.queueService.queueEventSource$.subscribe(e => {
      this.deadQueueGroups = e;
      this.cd.markForCheck();
    });
    this.migrateFromQueue = new QueueItem();
    this.migrateFromQueue.host = '';
    this.migrateFromQueue.name = '';
    this.migrateTasks = [];
    this.shouldCheckUpdate = true;
    this.timer = setInterval(() => { this.update(); }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  update() {
    if (this.shouldCheckUpdate) {
      this.queryMigrateTask();
    }
  }

  createMigrateTask() {
    if (!this.migrateFromQueue || !this.migrateFromQueue.name) {
      this.errorMsg = '请选择要迁移的队列';
      return;
    }

    if (!this.migrateToExchange) {
      this.errorMsg = '请选择要发送的exchange';
      return;
    }

    this.errorMsg = '';

    this.api.createMigrateTask(
      this.migrateFromQueue.host,
      this.migrateFromQueue.name,
      this.migrateToExchange,
      this.routingKey,
      this.consumSpeed).subscribe(res => { this.onGetMigrateTaskResult(res); });
  }

  queryMigrateTask() {
    this.api.queryMigrateTaskList().subscribe(res => { this.onGetMigrateTaskResult(res); });
  }

  onGetMigrateTaskResult(res: LResponse<MigrateItem>) {
    if (res.code === 0) {

      const resultList = [];

      this.migrateTasks.forEach(task => {
        const newTask = res.data.find(t => t.taskID === task.taskID);
        if (newTask != null) {
          task.update(newTask);
          resultList.push(task);
        }
      });

      res.data.forEach(t => {
        const oldTask = this.migrateTasks.find(task => task.taskID === t.taskID);
        if (oldTask == null) {
          resultList.push(new MigrateItem(t));
        }
      });

      resultList.sort((t1, t2) => t2.taskID - t1.taskID);
      this.migrateTasks = resultList;

      this.shouldCheckUpdate = false;
      this.migrateTasks.forEach(task => {
        if (task.suspend === false && task.migrateMessageCount < task.migrateTotalCount) {
          this.shouldCheckUpdate = true;
        }
      });
    } else {
      this.message.error(res.reason);
      console.log(res);
    }
  }

  percentFormat(percent: number): string {
    if (percent === 100) {
      return 'Done';
    } else {
      return percent.toFixed(1) + '%';
    }
  }

  findSuggeustExchangeForQueue() {
    if (this.migrateFromQueue && this.exchanges) {
      console.log(this.migrateFromQueue);
      let st = this.migrateFromQueue.name.indexOf('.ttl.dead.letter.queue');
      if (st > 0) {
        const ttlExchange = this.migrateFromQueue.name.replace('.ttl.dead.letter.queue', '.ttl.direct.exchange');
        if (this.exchanges.findIndex(e => e.name === ttlExchange) >= 0) {
          this.migrateToExchange = ttlExchange;
          this.onSelectExchange(ttlExchange);
        }
      } else {
        st = this.migrateFromQueue.name.indexOf('.dead.letter');
        if (st > 0) {
          const subName = this.migrateFromQueue.name.substring(0, st);
          const sugguestExchange = this.exchanges.filter(e => e.name.startsWith(subName) && (e.name.indexOf('.dead.letter') === -1));
          if (sugguestExchange.length > 0) {
            this.migrateToExchange = sugguestExchange[0].name;
            this.onSelectExchange(sugguestExchange[0].name);
          }
        }
      }
    }
  }

  updateExchange(host: string) {
    this.exchangeHost = host;
    this.api.queryExchanges(host).subscribe(res => {
      if (res.code === 0) {
        this.exchanges = res.data;
        this.findSuggeustExchangeForQueue();
      } else {
        console.log(res);
      }
    });
  }

  onSelectQueueChanged(e) {
    this.migrateToExchange = '';
    this.bindInfo = null;
    this.routingKey = null;

    if (this.exchangeHost === undefined || this.exchangeHost == null || this.exchangeHost === '') {
      this.updateExchange(this.migrateFromQueue.host);
      return;
    }

    if (this.exchangeHost !== this.migrateFromQueue.host) {
      this.updateExchange(this.migrateFromQueue.host);
      return;
    }

    this.findSuggeustExchangeForQueue();
  }

  onSelectExchange(exchangeName) {
    this.bindInfo = null;
    this.routingKey = null;

    if (exchangeName && this.exchangeHost && this.exchanges) {
      this.selectExchange = this.exchanges.find(ex => ex.name === exchangeName);
      if (this.selectExchange && this.selectExchange.type !== 'fanout') {
        this.api.queryExchangeBind(this.exchangeHost, exchangeName).subscribe(res => {
          if (res.code === 0) {
            this.bindInfo = res.data;
          } else {
            console.log(res.code);
          }
        });
      }
    }
  }

  suspendTask(task: MigrateItem) {
    this.api.suspendMigrateTask(task.taskID).subscribe(res => { this.onGetMigrateTaskResult(res); });
  }

  resumeTask(task: MigrateItem) {
    this.api.resumeMigrateTask(task.taskID).subscribe(res => { this.onGetMigrateTaskResult(res); });
  }

  cancelTask(task: MigrateItem) {
    this.api.cancelMigrateTask(task.taskID).subscribe(res => { this.onGetMigrateTaskResult(res); });
  }
}
