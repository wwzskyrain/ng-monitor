
export class NotifyGroupItem {
    public id: number;
    public groupName: string;
    public dingdingToken: string;
    public createBy: string;
    public createTime: Date;
    public appNames: string[];
    public modifyApp: boolean;

    constructor(json: any) {
        this.update(json);
        this.modifyApp = false;
    }

    update(json: any) {
        this.id = json['id'];
        this.groupName = json['groupName'];
        this.dingdingToken = json['dingdingToken'];
        this.createBy = json['createBy'];
        this.createTime = json['createTime'];
        this.appNames = json['appNames'];
    }
}
