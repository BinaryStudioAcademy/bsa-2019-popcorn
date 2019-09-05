import { EntityRepository, Repository } from "typeorm";
import { NotificationToken } from "../entities/NotificationToken";

@EntityRepository(NotificationToken)
class NotificationTokenRepository extends Repository<NotificationToken> {}

export default NotificationTokenRepository;
