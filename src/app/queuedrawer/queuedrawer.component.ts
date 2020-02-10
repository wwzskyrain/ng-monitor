import { Component, OnInit, Input } from '@angular/core';
import { QueueItem } from '../model/queueItem';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { ContentComponent } from '../content/content.component';
import { NetworkService } from '../network.service';

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


  value = 'hello erik';

  constructor(private sanitizer: DomSanitizer, private drawerService: NzDrawerService, private netService: NetworkService) {
    this.height = (window.innerHeight - 115) + 'px';
  }

  ngOnInit() {
  }

  show(queue: QueueItem) {
    // this.selectQueue = queue;
    // this.queueURL = this.sanitizer.bypassSecurityTrustResourceUrl(queue.url) ;
    // this.visible = true;

    const drawerRef = this.drawerService.create<ContentComponent, { queueName: string}, string>({
      nzWidth: '80%',
      nzBodyStyle: { overflow: 'auto' },
      nzTitle: 'Component',
      nzContent: ContentComponent,
      nzContentParams: {
        queueName: queue.name
      },
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
