export class MessageContent {
    public routingKey: string;
    public payload: string;
    private payloadEncoding: string;

    constructor(json: any) {
        this.convert(json);
    }

    convert(json: any) {
        this.routingKey = json['routingKey'];
        this.payload = json['payload'];
        this.payloadEncoding = json['payloadEncoding'];
    }
}
