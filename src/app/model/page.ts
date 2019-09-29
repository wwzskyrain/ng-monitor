export interface Page<T> {
    count: number;
    pageId: number;
    pageSize: number;
    values: T[];
}
