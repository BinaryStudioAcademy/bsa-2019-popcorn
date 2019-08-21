import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import UserRepository from "../repository/user.repository";
import ReviewRepository from "../repository/review.repository";
import { Review } from "../models/ReviewModel";

export class SeedReviews1566319951202 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const user = await getCustomRepository(UserRepository).getByEmail(
      "test@gmail.com"
    );
    const reviewTexts = [
      `This film is about the Avengers collecting the infinity stones to find missing Avengers members who were vanished by Thanos and his Alien army.
            
            I like this film because I love Robert Downey Jr., Chris Evans and Tom Holland as Iron Man, Captain America and Spider Man's acting! Also it's from my favorite Movie stadium 'Marvel'!
            
            So l would like to give 5 out of 5stars! *o*`,
      `I often watch the TV show on Zing TV, I like the show name, Running Man. Especially in China, it's 6 seasons already. I like the cartoon of course, and comedy. Why? Causes I'm a kid. : ) I love The Life Secret Of Pets 1 and 2, I wonder why it's so cute and funny. And the time remaining, I spend for sleep, eat and study MORE ENGLISH. : (`,
      `pirate of the Caribbean.
            adventure
            My favorite film is pirate of the Caribbean .I have embraced Pirate of the Caribbean series .
            Jack sparrow visit unique island . Series of pirate of the Caribbean start 2003 . My favorite story is "world end " .`,
      `It is a dramatic film and it was made in 2010 after the book. This story is about a couple and their problems, they have a lot of problems with their families. She is a rich girl and her parents dindn't want that she was the girlfriend of this boy. In my opinion this film is recomended for young people and women but not for men because is a film of love and is drama, so a lot of men prefer action films.`,
      `It was created on July 13, 2108.
            He deals with the fact that he will ford an old fbi leader of the rescue group and now he works as a security consultant for skyscrapers.
            They will give you a very intextable tablet that can control the entire skyscraper. I in a Chinese mission finds that the tallest and safest building in the world suddenly flared up, and there his family is found while he finds those responsible of the fire that stole the tablet that.
            
            RECOMMEND THIS FILM IF LIKE FILMS ACTION.`,
      `I love the actors in this film. They are fantastic as Sherlock, Watson and brother Sherloks. My favorite character is Sherlock because he is handsome men and he plays role Sherlock very good`,
      `Divergent
            It is a science fiction movie created on April 30, 2014.
            The movie is about a city where people are divided by factions. The protagonist is called Trish and goes through difficulties because it does not fit into any faction. He is in love with Tobias and together they will face the people who want to kill them.
            I love Trish because she is super brave and pretty. She is one of the best actresses I have seen.
            I think it's a good movie and you should see it.`,
      `The terminator is one of the best action and science fiction flims. Released in 1984, it stars Arnold Shwarzenegger, the villian in this film.
            The plot involves a terminator is a killer cyborg sent trought time to kill Sarah Connor. Kyle Reese, a soldier also sent from the future with the mission to protect Sarah. Can he get it?
            The film is set in the location of Los Angeles, California. The soundtrack includes music reformed by Brad Fiedel. The acting is very good and because of the success they become more.
            I would highly recommend the terminator if you like robots and fights. Im sure you will not regret waching it.`,
      `My favourite film is Lemony Snicket because the plot it's very interesting and the characters are fantastic!
            The main characters are: Violet, Klaus, Sunny, Josephine, Conte Olaf and Montgomery Montgomery (They are Violet, Klaus and Sunny's uncles) .
            I love the character of Conte Olaf because he is very funny and his look it's strange. I also love the character of Josephine because she is awkward and she live in a danger house!
            I suggest see this fantastic film!!`,
      `My favourite film is Frankestein Joniur. It is a parody of an horror film. I love it because its actors and the director are very fantastic and funny! Did you see it? I think it is the best film in the world!!!! ;-)`
    ];

    for (const text of reviewTexts) {
      const review = new Review();
      review.text = text;
      review.movieId = "2";
      review.user = user;
      await getCustomRepository(ReviewRepository).save(review);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
