import { EntityRepository, Repository } from "typeorm";
import { NotificationToken } from "../entities/NotificationToken";
import { Notification } from "entities/Notification";

@EntityRepository(NotificationToken)
class NotificationTokenRepository extends Repository<NotificationToken> {}

export default NotificationTokenRepository;
