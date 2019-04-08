import { Component, OnInit, Input } from '@angular/core';
import { QueueItem } from '../model/queueItem';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

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

  constructor(private sanitizer: DomSanitizer) {
    this.height = (window.innerHeight - 115) + 'px';
  }

  ngOnInit() {
  }

  show(queue: QueueItem) {
    this.selectQueue = queue;
    this.queueURL = this.sanitizer.bypassSecurityTrustResourceUrl(queue.url) ;
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}
