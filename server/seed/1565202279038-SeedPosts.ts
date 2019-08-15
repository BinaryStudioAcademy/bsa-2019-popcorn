import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import PostRepository from "../repository/post.repository";
import UserRepository from "../repository/user.repository";
import { Post } from "../models/PostModel";

export class SeedPosts1565202279038 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const { SERVER_URL } = process.env;
    const postsSeed = [
      {
        title: "PeakyBlinders",
        description:
          "He is back. PeakyBlinders Series 5 will premiere on on Sunday 25th August at 9pm.",
        image_url: "https://i.imgur.com/crEbywC.jpg"
      },
      {
        title: "StrangersThings",
        description: "Time to start a new series. StrangersThings",
        image_url: "https://i.imgur.com/gJNt3yL.jpg"
      },
      {
        title: "Euphoria",
        description:
          "It's shocking, disturbing and at times very uncomfortable to watch. However this new drama starring Zendaya (#TheGreatestShowman) is without a doubt one of the best shows of 2019. #HBO 5/5 ⭐️⭐️⭐️⭐️⭐️",
        image_url: "https://i.imgur.com/guE230h.jpg"
      },
      {
        title: "GameOfThrones",
        description: "Party Beyond The Wall! GameOfThrones",
        image_url: "https://i.imgur.com/mvmMIUG.jpg"
      },
      {
        title: "TheFamily",
        description: "TheFamily Netflix S H O O K",
        image_url: "https://i.imgur.com/dyVCgnI.jpg"
      },
      {
        title: "barry",
        description: "One of the best tv series! 🔥 hbo barry",
        image_url: "https://i.imgur.com/v2eQNKC.jpg"
      },
      {
        title: "Euphoria",
        description:
          "'Euphoria' creator breaks down the #HBO drama's emotional season finale, teases season 2",
        image_url: "https://i.imgur.com/hsOKyaJ.jpg"
      },
      {
        title: "beforeigners",
        description: "It's comiiing. beforeigners hbo",
        image_url: "https://i.imgur.com/HqIQEvZ.jpg"
      }
    ];

    postsSeed.map(async postData => {
      const post = new Post();
      post.title = postData.title;
      post.description = postData.description;
      post.image_url = postData.image_url;
      const users = await getCustomRepository(UserRepository).find();
      post.user = users[Math.floor(Math.random() * users.length)];
      await getCustomRepository(PostRepository).save(post);
    });
  }
  public async down(queryRunner: QueryRunner): Promise<any> {}
}
