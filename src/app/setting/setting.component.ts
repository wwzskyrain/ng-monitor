import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SettingItem } from '../model/settingItem';
import { NetworkService } from '../network.service';
import { NotifyGroupItem } from '../model/notifyGroupItem';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  settings: SettingItem[];
  notifyGroups: NotifyGroupItem[];
  isVisible = false;

  newGroupName: string;
  newDingdingToken: string;

  inputValue = '';
  selectGroup: NotifyGroupItem;
  // @ViewChild('inputElement') inputElement: ElementRef;


  constructor(public api: NetworkService) { }

  ngOnInit() {
    this.loadSettings();
    this.loadNotifyGroups();
  }

  commitSetting(setting: SettingItem, ele) {
    console.log(setting);
    console.log(ele.value);

    if (setting.value === ele.value) {
      return;
    }

    this.api.updateSetting(setting.name, ele.value).subscribe(res => {
      if (res.code === 0) {
        this.settings = res.data;
      } else {
        console.log(res);
      }
    });
  }

  loadSettings() {
    this.api.getSettings().subscribe(res => {
      if (res.code === 0) {
        this.settings = res.data;
      } else {
        console.log(res);
      }
    });
  }

  loadNotifyGroups() {
    this.api.getNotifyGroups().subscribe(res => {
      if (res.code === 0) {
        this.updateNotifyGroup(res.data);
      } else {
        console.log(res);
      }
    });
  }

  deleteAppFromGroup(appName: string, groupId: number) {
    this.api.deleteAppFromGroup(appName, groupId).subscribe(res => {
      if (res.code === 0) {
        this.updateNotifyGroup(res.data);
      } else {
        console.log(res);
      }
    });
  }

  show(ele) {
    ele.style.display = 'block';
  }

  hide(ele) {
    ele.style.display = 'none';
  }

  showModal(): void {
    this.newDingdingToken = '';
    this.newGroupName = '';
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.newGroupName === '') {
      return;
    }

    this.api.createNotifyGroup(this.newGroupName, this.newDingdingToken).subscribe(res => {
      if (res.code === 0) {
        this.updateNotifyGroup(res.data);
      } else {
        console.log(res);
      }
    });
    this.isVisible = false;
  }

  updateNotifyGroup(ngs: NotifyGroupItem[]) {
    this.notifyGroups = ngs.map(json => new NotifyGroupItem(json));
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showInput(group: NotifyGroupItem, ele): void {
    group.modifyApp = true;
    console.log(ele);
  }

  handleInputConfirm(group: NotifyGroupItem): void {
    if (this.inputValue) {
      this.api.addAppToGroup(this.inputValue, group.id).subscribe(res => {
        if (res.code === 0) {
          this.updateNotifyGroup(res.data);
        } else {
          console.log(res);
        }
      });
    }
    this.inputValue = '';
    group.modifyApp = false;
  }

  updateToken(group: NotifyGroupItem) {
    this.selectGroup = group;
    this.newDingdingToken = group.dingdingToken;
  }

  handleTokenOk() {
    this.api.updateDingDingToken(this.selectGroup.id, this.newDingdingToken).subscribe(res => {
      if (res.code === 0) {
        this.updateNotifyGroup(res.data);
      } else {
        console.log(res);
      }
    });

    this.selectGroup = null;
    this.newDingdingToken = '';
  }

  handleTokenCancel() {
    this.selectGroup = null;
    this.newDingdingToken = '';
  }
}
