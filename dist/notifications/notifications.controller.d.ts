import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAllForMe(user: {
        id: number;
    }): Promise<import("./entities/notification.entity").Notification[]>;
    marquerCommeLue(id: number): Promise<import("./entities/notification.entity").Notification>;
}
