export class MyResponse {
    code: number;
    message: string;
    data: any;
}

export class OResponse<T> {
    code: number;
    reason: string;
    data: T;
}

export class LResponse<T> {
    code: number;
    reason: string;
    data: T[];
}
