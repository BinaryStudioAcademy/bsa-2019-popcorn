import { EntityRepository, Repository } from "typeorm";
import { Notification } from "../entities/Notification";

@EntityRepository(Notification)
class NotificationRepository extends Repository<Notification> {}

export default NotificationRepository;
