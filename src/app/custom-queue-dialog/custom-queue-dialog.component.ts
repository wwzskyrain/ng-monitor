import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../network.service';
import { QueuesService } from '../queues.service';

@Component({
  selector: 'app-custom-queue-dialog',
  templateUrl: './custom-queue-dialog.component.html',
  styleUrls: ['./custom-queue-dialog.component.css']
})
export class CustomQueueDialogComponent implements OnInit {
  queueName = '';
  isVisible = false;
  queue: string[];
  changed: boolean;

  constructor(public api: NetworkService,
    private queueService: QueuesService) {}

  show(): void {
    this.changed = false;
    this.queueName = '';
    this.isVisible = true;
    this.queue = [];
    this.updateQueueList();
  }

  updateQueueList(): void {
    this.api.getBusinessCustomQueueList().subscribe(res => {
      if (res.code === 0) {
        this.queue = res.data;
      }
    });
  }

  onAddNewQueue(): void {
    if (this.queueName !== '') {
      this.changed = true;
      this.api.addBusinessCustomQueue(this.queueName).subscribe(res => {
        this.updateQueueList();
      });
    }
  }

  onRemoveQueue(queueName: string): void {
    if (queueName !== '') {
      this.changed = true;
      this.api.removeBusinessCustomQueue(queueName).subscribe(res => {
        this.updateQueueList();
      });
    }
  }

  handleOk(): void {
    this.isVisible = false;
    if (this.changed) {
      this.queueService.fireRefreshEvent();
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    if (this.changed) {
      this.queueService.fireRefreshEvent();
    }
  }

  ngOnInit() {
  }

}
