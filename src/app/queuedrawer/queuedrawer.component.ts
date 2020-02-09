import { Component, OnInit, Input } from '@angular/core';
import { QueueItem } from '../model/queueItem';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-queuedrawer',
  templateUrl: './queuedrawer.component.html',
  styleUrls: ['./queuedrawer.component.css']
})
export class QueuedrawerComponent implements OnInit {
  selectQueue: QueueItem;
  visible = false;
  queueURL: SafeResourceUrl;
  height: string;

  constructor(private sanitizer: DomSanitizer, private drawerService: NzDrawerService) {
    this.height = (window.innerHeight - 115) + 'px';
  }

  ngOnInit() {
  }

  show(queue: QueueItem) {
    // this.selectQueue = queue;
    // this.queueURL = this.sanitizer.bypassSecurityTrustResourceUrl(queue.url) ;
    // this.visible = true;

    const drawerRef = this.drawerService.create<NzDrawerCustomComponent, { value: string }, string>({
      nzTitle: 'Component',
      nzContent: NzDrawerCustomComponent,
      nzContentParams: {
        value: this.value
      }
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log(data);
      if (typeof data === 'string') {
        this.value = data;
      }
    });

  }

  hide() {
    this.visible = false;
  }
}
