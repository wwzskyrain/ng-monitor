import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LResponse, OResponse } from './model/response';
import { SettingItem } from './model/settingItem';
import { QueueItem } from './model/queueItem';
import { MigrateItem } from './model/migrateItem';
import { ExchangeItem } from './model/exchangeItem';
import { NodeItem } from './model/nodeItem';
import { ExchangeBindItem } from './model/exchangeBindItem';
import { environment } from '../environments/environment';
import { AppItem } from './model/appItem';
import { Ops } from './model/opsItem';
import { NotifyGroupItem } from './model/notifyGroupItem';
import { Page } from './model/page';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  public host = environment.host;

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      console.log('runing in dev mode');
    } else {
      console.log('runing in prod mode');
    }
  }

  getSettings(): Observable<LResponse<SettingItem>> {
    const url = this.host + 'setting/';
    return this.http.get<LResponse<SettingItem>>(url);
  }

  queryAllDeadQueue(): Observable<LResponse<AppItem>> {
    const url = this.host + 'app/';
    return this.http.get<LResponse<AppItem>>(url);
  }

  queryAllDeadQueueByOps(): Observable<LResponse<AppItem>> {
    const url = this.host + 'app/ops';
    return this.http.get<LResponse<AppItem>>(url);
  }

  queryDeadQueue(): Observable<LResponse<QueueItem>> {
    const url = this.host + 'queue/';
    return this.http.get<LResponse<QueueItem>>(url);
  }

  forceQueryDeadQueue(): Observable<LResponse<QueueItem>> {
    const url = this.host + 'queue/run';
    return this.http.get<LResponse<QueueItem>>(url);
  }

  queryExchanges(host: string): Observable<LResponse<ExchangeItem>> {
    const url = this.host + 'exchange/' + host;
    return this.http.get<LResponse<ExchangeItem>>(url);
  }

  queryExchangeBind(host: string, exchange: string): Observable<LResponse<ExchangeBindItem>> {
    const url = this.host + `exchange/${host}/${exchange}`;
    return this.http.get<LResponse<ExchangeBindItem>>(url);
  }

  queryDeadQueueFirstTime(): Observable<LResponse<QueueItem>> {
    const url = this.host + 'queue/run';
    return this.http.get<LResponse<QueueItem>>(url);
  }

  queryMigrateTaskList(page: number): Observable<OResponse<Page<MigrateItem>>> {
    const url = this.host + `migrate/${page}`;
    return this.http.get<OResponse<Page<MigrateItem>>>(url);
  }

  createMigrateTask(host: string, from: string, to: string, key: string,
    consumSpeed: number, taskCount: number): Observable<OResponse<Page<MigrateItem>>> {
    const url = this.host + 'migrate/create';
    return this.http.post<OResponse<Page<MigrateItem>>>(url, {
      host: host,
      fromQueue: from,
      toExchange: to,
      consumerSpeed: consumSpeed,
      routingKey: key,
      total: taskCount,
    });
  }

  updateSetting(name: string, value: string): Observable<LResponse<SettingItem>> {
    const url = this.host + 'setting/set';
    return this.http.post<LResponse<SettingItem>>(url, {
      key: name,
      value: value
    });
  }

  suspendMigrateTask(page: number, id: number): Observable<OResponse<Page<MigrateItem>>> {
    const url = this.host + `migrate/suspend/${page}/${id}`;
    return this.http.get<OResponse<Page<MigrateItem>>>(url);
  }

  resumeMigrateTask(page: number, id: number): Observable<OResponse<Page<MigrateItem>>> {
    const url = this.host + `migrate/resume/${page}/${id}`;
    return this.http.get<OResponse<Page<MigrateItem>>>(url);
  }

  cancelMigrateTask(page: number, id: number): Observable<OResponse<Page<MigrateItem>>> {
    const url = this.host + `migrate/cancel/${page}/${id}`;
    return this.http.get<OResponse<Page<MigrateItem>>>(url);
  }

  queryNodes(): Observable<LResponse<NodeItem>> {
    const url = this.host + `setting/nodes`;
    return this.http.get<LResponse<NodeItem>>(url);
  }

  addNode(node: NodeItem): Observable<LResponse<NodeItem>> {
    const url = this.host + `setting/nodes/add`;
    return this.http.post<LResponse<NodeItem>>(url, node);
  }

  deleteNode(node: NodeItem): Observable<LResponse<NodeItem>> {
    const url = this.host + `setting/nodes/delete/${node.host}`;
    return this.http.get<LResponse<NodeItem>>(url);
  }

  getOps(): Observable<OResponse<Ops>> {
    const url = this.host + `setting/ops`;
    return this.http.get<OResponse<Ops>>(url);
  }

  getNotifyGroups(): Observable<LResponse<NotifyGroupItem>> {
    const url = this.host + `notifyGroup/`;
    return this.http.get<LResponse<NotifyGroupItem>>(url);
  }

  createNotifyGroup(groupName: string, token: string): Observable<LResponse<NotifyGroupItem>> {
    const url = this.host + `notifyGroup/create_group`;
    return this.http.post<LResponse<NotifyGroupItem>>(url, {
      groupName: groupName,
      dingdingToken: token
    });
  }

  deleteAppFromGroup(appName: string, groupId: number): Observable<LResponse<NotifyGroupItem>> {
    const url = this.host + `notifyGroup/remove_app/${groupId}/${appName}`;
    return this.http.get<LResponse<NotifyGroupItem>>(url);
  }

  addAppToGroup(appName: string, groupId: number): Observable<LResponse<NotifyGroupItem>> {
    const url = this.host + `notifyGroup/add_app/${groupId}/${appName}`;
    return this.http.get<LResponse<NotifyGroupItem>>(url);
  }

  updateDingDingToken(id: number, dingdingToken: string): any {
    const url = this.host + `notifyGroup/update_token/${id}/${dingdingToken}`;
    return this.http.get<LResponse<NotifyGroupItem>>(url);
  }

  getBusinessCustomQueueList(): Observable<LResponse<string>> {
    const url = this.host + `queue/get-business-queue`;
    return this.http.get<LResponse<string>>(url);
  }

  addBusinessCustomQueue(queueName: string): Observable<OResponse<string>> {
    const url = this.host + `queue/add-business-queue/${queueName}`;
    return this.http.get<OResponse<string>>(url);
  }

  removeBusinessCustomQueue(queueName: string): Observable<OResponse<string>> {
    const url = this.host + `queue/remove-business-queue/${queueName}`;
    return this.http.get<OResponse<string>>(url);
  }
}
