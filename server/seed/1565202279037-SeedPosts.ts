import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import PostRepository from "../repository/post.repository";
import { Post } from "../models/PostModel";
const uuid = require('uuid/v4');

export class SeedPosts1565202279037 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        
        const post = new Post();
        post.id = uuid();
        post.title = 'title-example';
        post.description = 'description-example';
        post.image_url = 'image-url-example';
        post.userId = "1cac6cbb-ff54-47fd-852e-991eb264ee44";

        await getCustomRepository(PostRepository)
            .save(post);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
