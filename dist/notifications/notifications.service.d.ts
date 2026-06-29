import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { User } from '../users/entities/user.entity';
export declare class NotificationsService {
    private readonly notificationsRepository;
    constructor(notificationsRepository: Repository<Notification>);
    create(utilisateur: User, message: string, details?: Notification['details']): Promise<Notification>;
    findAllForUser(userId: number): Promise<Notification[]>;
    marquerCommeLue(id: number): Promise<Notification>;
}
