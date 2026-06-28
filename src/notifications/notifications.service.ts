import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,
  ) {}

  // Utilise par ReservationsService pour notifier les admins
  // lors de la creation/validation d'une reservation
  create(
    utilisateur: User,
    message: string,
    details?: Notification['details'],
  ): Promise<Notification> {
    const notification = this.notificationsRepository.create({
      utilisateur,
      message,
      details,
      lu: false,
    });
    return this.notificationsRepository.save(notification);
  }

  findAllForUser(userId: number): Promise<Notification[]> {
    return this.notificationsRepository.find({
      where: { utilisateur: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async marquerCommeLue(id: number): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({
      where: { id },
    });
    if (!notification) {
      throw new NotFoundException(`Notification #${id} introuvable`);
    }
    notification.lu = true;
    return this.notificationsRepository.save(notification);
  }
}
