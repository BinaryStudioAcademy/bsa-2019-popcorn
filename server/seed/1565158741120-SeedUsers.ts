import {getCustomRepository, MigrationInterface, QueryRunner} from "typeorm";
import UserRepository from "../repository/user.repository";
import {User} from "../models/UserModel";
const uuid = require('uuid/v4');

export class SeedUsers1565158741120 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const user = new User();
        user.name = "admin";
        user.password = 'admin';
        user.id = uuid();
        user.email="test@gmail.com";
        user.location='location';
        user.aboutMe='something';

        await getCustomRepository(UserRepository)
            .save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
