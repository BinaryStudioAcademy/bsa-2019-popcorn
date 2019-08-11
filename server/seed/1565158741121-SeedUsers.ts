import {getCustomRepository, MigrationInterface, QueryRunner} from "typeorm";
import UserRepository from "../repository/user.repository";
import {User} from "../models/UserModel";
const uuid = require('uuid/v4');

export class SeedUsers1565158741121 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const user = new User();
        user.name = "admin";
        user.password = 'admin';
        user.id = "7f13634d-c353-433c-98fe-ead99e1252c7"; //uuid();
        user.email="test@gmail.com";
        user.location='location';
        user.aboutMe='something';
        user.avatar = '';

        await getCustomRepository(UserRepository)
            .save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
