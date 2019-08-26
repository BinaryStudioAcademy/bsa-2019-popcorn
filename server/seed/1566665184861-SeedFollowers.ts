import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import UserRepository from "../repository/user.repository";
import FollowerRepository from "../repository/follower.repository";
import { Follower } from "../models/FollowerModel";

export class SeedFollowers1566665184861 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const users = await getCustomRepository(UserRepository).find();
    for (const followed of users) {
      const usersNumber = users.length;
      const followersNumber = Math.floor(Math.random() * usersNumber - 1);
      let potentialFollowers = users.filter(user => user.id !== followed.id);

      for (let index = 0; index < followersNumber; index++) {
        const follower = new Follower();

        const randomFollower =
          potentialFollowers[
            Math.floor(Math.random() * potentialFollowers.length)
          ];

        follower.user = followed;
        follower.follower = randomFollower;
        await getCustomRepository(FollowerRepository).save(follower);

        potentialFollowers = potentialFollowers.filter(
          follower => follower.id !== randomFollower.id
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
