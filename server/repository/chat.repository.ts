import {
  EntityRepository,
  Repository,
  getCustomRepository,
  createQueryBuilder
} from "typeorm";
import { Chat } from "../entities/Chat";

@EntityRepository(Chat)
class ChatRepository extends Repository<Chat> {}

export default ChatRepository;
