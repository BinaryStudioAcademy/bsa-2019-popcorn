import UserRepository from "../repository/user.repository";
import TopRepository from "../repository/top.repository";
import { MovieInTop } from "../models/MovieInTopModel";
import MovieInTopRepository from "../repository/movieInTop.repository";
import { Top } from "../models/TopModel";
import { getCustomRepository, MigrationInterface, QueryRunner } from "typeorm";

export class SeedTops1566549724762 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const tops = [
      {
        id: "e1372139-733c-44f5-a5d8-6260d6cc95b9",
        title: "The best comedies of all time",
        topImageUrl:
          "https://telegraf.com.ua/files/2019/06/50822482_143507293267697_906821660758496382_n1-388x206.jpg",
        MovieInTop: [
          "4253",
          "3966",
          "3930",
          "925",
          "912",
          "2241",
          "2228",
          "2180",
          "1684"
        ],
        description:
          "Need a laugh? Then you were wise to visit Popcorn, because we’re presenting our guide to the best comedies of all times so far, ranked by me! (We’re also including the worst comedies of 2019, so you know what to avoid, or what to seek out if you’re in for a chuckle of a different variety.)"
      },
      {
        id: "fdd6492d-d080-4f25-889a-c0502a7223e9",
        title: "The cutest melodramas",
        topImageUrl:
          "https://filmschoolrejects.com/wp-content/uploads/2019/02/44-notebook-700x500.jpg",
        MovieInTop: ["2065", "921", "1252", "1959", "824"],
        description:
          "The romantic drama film genre is an intersection of drama films and romance films. Films in this category are classified as drama films and romance films."
      },
      {
        id: "0bd92b68-1100-4b50-bae7-e53951f9bad0",
        title: "Very scary horror movies",
        topImageUrl:
          "https://cdn3.movieweb.com/i/article/FGtG5gX217RVxplSsipPUNPBnXtf7C/798:50/Netflix-Halloween-Horror-Movies.jpg",
        MovieInTop: ["832", "814", "106"],
        description:
          "Sure, Halloween is months away, but does that mean you can't watch scary movies the rest of the year? Hell no! Thankfully, Popcorn has you covered with a healthy horror section full of prestige horror films and schlocky splatter movies. While your options are limitless, here are the best scary movies to stream on Netflix right now, which will ensure you'll have a spooky and creepy year (but don't blame us for the nightmares)."
      },
      {
        id: "ff6bdd1d-34a5-4ce6-acd0-427e801c5efc",
        title: "Fierce movies with fights",
        topImageUrl:
          "https://www.indiewire.com/wp-content/uploads/2014/11/contact-sports-movies-you-may-not-know-lesser-seen-warrior-girl-fight-fat-city-foxcatcher-vision-quest.jpg",
        MovieInTop: ["115", "98", "95", "70", "224", "653"],
        description:
          "The best movies with amazing fight scenes !! I am a crazy fan of all those films...I invite you to comment and share your thought ...I will watch it again and again and again !!!"
      },
      {
        id: "81d9ea1e-3647-4c2a-bd73-74bfb0c906c8",
        title: "Best films for children under 12 years old",
        topImageUrl:
          "https://images.fatherly.com/wp-content/uploads/2018/06/7bestmovieskids_headerb.jpg?q=65&enable=upscale&w=600",
        MovieInTop: ["862", "863", "810", "1498"],
        description:
          "Looking for a great flick to watch with the kids at your next family movie night? Hoping to introduce your child to the films that defined your childhood? From Star Wars to Toy Story, here’s our definitive list of movies your kids absolutely must see before they’re not so little anymore. Grab the popcorn and keep scrolling."
      },
      {
        id: "7363c2dc-b462-44cc-ad3e-50e94a240a35",
        title: "Great movies to watch with friends",
        topImageUrl:
          "https://camblycontent.files.wordpress.com/2016/07/favorite-movies-of-all-time.png?w=700&h=374",
        MovieInTop: [
          "1931",
          "990",
          "1247",
          "912",
          "933",
          "951",
          "989",
          "1278",
          "1726",
          "1830",
          "1612",
          "1701"
        ],
        description:
          "In honor of friendship we give you the top ten movies you must with watch your best friends."
      }
    ];

    const users = await getCustomRepository(UserRepository).find();

    const comments = [
      "Nice movie",
      "Really amazing",
      "My favotite movie in this top",
      "Very interesting movie!",
      "So cool movie"
    ];

    for (const topInfo of tops) {
      const top = new Top();
      top.id = topInfo.id;
      top.title = topInfo.title;
      top.topImageUrl = topInfo.topImageUrl;
      top.description = topInfo.description;
      top.user = users[Math.floor(Math.random() * users.length)];
      await getCustomRepository(TopRepository).save(top);
    }

    const topsInDB = await getCustomRepository(TopRepository).find();
    for (const topInDB of topsInDB) {
      const top = tops.find(top => top.id === topInDB.id);
      top.MovieInTop.map(async movieInTopId => {
        const movieInTop = new MovieInTop();
        movieInTop.comment =
          comments[Math.floor(Math.random() * comments.length)];
        movieInTop.topId = topInDB.id;
        movieInTop.movieId = parseInt(movieInTopId);
        await getCustomRepository(MovieInTopRepository).save(movieInTop);
      });
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
