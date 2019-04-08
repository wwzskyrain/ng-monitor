import { AdminItem } from './adminItem';
import { QueueItem } from './queueItem';

export class AppItem {
    public appName: string;
    public admins: AdminItem[];
    public queueInfoList: QueueItem[];
    public expand: boolean;
}
