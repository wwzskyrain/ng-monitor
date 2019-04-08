export class MigrateItem {
    public fromQueue: string;
    public toExchange: string;
    public routingKey: string;
    public createByOpsName: string;
    public createTime: Date;
    public taskID: number;
    public migrateTotalCount: number;
    public migrateMessageCount: number;
    public consumerSpeed: number;
    public suspend: boolean;

    constructor(json) {
        this.update(json);
    }

    update(json) {
        this.fromQueue = json['fromQueue'];
        this.toExchange = json['toExchange'];
        this.taskID = json['taskID'];
        this.migrateTotalCount = json['migrateTotalCount'];
        this.migrateMessageCount = json['migrateMessageCount'];
        this.consumerSpeed = json['consumerSpeed'];
        this.suspend = json['suspend'];
        this.routingKey = json['routingKey'];
        this.createTime = json['createTime'];
        this.createByOpsName = json['createByOpsName'];
    }

    getPercent(): string {
        return (this.migrateMessageCount * 100 / this.migrateTotalCount).toFixed(1);
    }
}
