import { getCustomRepository, MigrationInterface, QueryRunner } from "typeorm";
import UserRepository from "../repository/user.repository";
import TopRepository from "../repository/top.repository";
import { Top } from "../models/TopModel";

export class SeedTops1566326006466 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const user = await getCustomRepository(UserRepository).getByEmail(
            "test@gmail.com"
        );

        const topsSeed = [];
        for (let i = 1; i <= 3; i++) {
            topsSeed.push({
                title: `My top ${i}`,
                user
            });
        }

        topsSeed.map(async topData => {
            const top = new Top();
            top.title = topData.title;
            top.user = topData.user;

            await getCustomRepository(TopRepository).save(top);
        });
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
