export class QueueItem {
    public name: string;
    public host: string;
    public state: string;
    public node: string;
    public url: string;
    public messages: number;
    public messagesReady: number;
}

export class QueueItemGroup {
    constructor(public host: string, public queues: QueueItem[]) {}
}
