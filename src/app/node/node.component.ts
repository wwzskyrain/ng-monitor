import { Component, OnInit } from '@angular/core';
import { NodeItem } from '../model/nodeItem';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {
  nodes: NodeItem[];
  inputNode: NodeItem;

  constructor(public api: NetworkService) { }

  ngOnInit() {
    this.nodes = [];
    this.inputNode = new NodeItem();
    this.inputNode.port = '5672';
    this.inputNode.user = 'guest';
    this.inputNode.password = 'guest';

    this.api.queryNodes().subscribe(res => {
      if (res.code === 0) {
        this.nodes = res.data;
      } else {
        console.log(res);
      }
    });
  }

  deleteNode(node) {
    this.api.deleteNode(node).subscribe(res => {
      if (res.code === 0) {
        this.nodes = res.data;
      } else {
        console.log(res);
      }
    });
  }

  addNode() {
    this.api.addNode(this.inputNode).subscribe(res => {
      if (res.code === 0) {
        this.nodes = res.data;
      } else {
        console.log(res);
      }
    });
  }
}
