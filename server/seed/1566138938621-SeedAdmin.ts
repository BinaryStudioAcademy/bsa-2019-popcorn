import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import UserRepository from "../repository/user.repository";
import { User } from "../models/UserModel";

export class SeedAdmin1566138938621 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const adminSeed = {
      name: "Admin",
      email: "admin@gmail.com",
      password: "admin1",
      role: "admin",
      location: "Lviv",
      aboutMe: "Study in Binary Studio Academy",
      avatar: "https://imgur.com/1NYENtx.jpg",
      male: true
    };

    const user = new User();
    user.name = adminSeed.name;
    user.password = adminSeed.password;
    user.email = adminSeed.email;
    user.role = adminSeed.role;
    user.location = adminSeed.location;
    user.aboutMe = adminSeed.aboutMe;
    user.avatar = adminSeed.avatar;
    user.male = adminSeed.male;
    await getCustomRepository(UserRepository).save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
