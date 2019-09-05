import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import UserRepository from "../repository/user.repository";
import ChatRepository from "../repository/chat.repository";
import { Chat } from "../models/ChatModel";

export class SeedChat1567284688344 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const users = await getCustomRepository(UserRepository).find();

    const pairwise = list => {
      if (list.length < 2) return [];
      const first = list[0];
      const rest = list.slice(1);
      const pairs = rest.map(x => [first, x]);
      return pairs.concat(pairwise(rest));
    };

    const allChatsUsers = pairwise(users);
    const chatsNumber = Math.floor(Math.random() * allChatsUsers.length);

    const shuffledChats = allChatsUsers.sort(() => 0.5 - Math.random());

    const selectedChats = shuffledChats.slice(0, chatsNumber);

    for (const participants of selectedChats) {
      const chat = new Chat();
      chat.user1 = participants[0];
      chat.user2 = participants[1];
      await getCustomRepository(ChatRepository).save(chat);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
