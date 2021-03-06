import { NzListModule } from 'ng-zorro-antd/list';
import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../network.service';
import { MessageContent } from '../model/messageContent';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  messageContents: MessageContent[];
  queueName: string;
  constructor(public api: NetworkService ) { }

  ngOnInit() {
    this.queryMessageContent(this.queueName);
  }

  queryMessageContent(queueName: string) {
    this.api.getMessageContent(queueName).subscribe(
      result => {
        if (result.code === 0) {
          this.messageContents = result.data;
          for (const messageContent of this.messageContents) {
            let prettyfiedContent: string ;
            try {
              const content = JSON.parse(messageContent.payload);
              prettyfiedContent = JSON.stringify(content, null, 4);
            } catch (e) {
              prettyfiedContent = messageContent.payload;
            }
            messageContent.payload = prettyfiedContent;
          }
        } else {
          console.log(result);
        }
      }
    );
  }

}
