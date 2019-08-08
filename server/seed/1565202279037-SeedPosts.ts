import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import PostRepository from "../repository/post.repository";
import UserRepository from "../repository/user.repository";
import { Post } from "../models/PostModel";
const uuid = require('uuid/v4');
export class SeedPosts1565202279037 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {

       const post = new Post();
       post.id = uuid();
       post.title = 'title-example';
       post.description = 'description-example';
       post.image_url = 'image-url-example';
       post.user = await getCustomRepository(UserRepository).findOne("7f13634d-c353-433c-98fe-ead99e1252c7");
       await getCustomRepository(PostRepository)
           .save(post);
   }
   public async down(queryRunner: QueryRunner): Promise<any> {
   }
}
