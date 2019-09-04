import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import ChatRepository from "../repository/chat.repository";
import MessageRepository from "../repository/message.repository";
import StoryRepository from "../repository/story.repository";
import { Message } from "../models/MessageModel";

export class SeedMessage1567286972231 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const MESSAGES = [
      "Good idea!",
      "Watch a movie about zombies, it’s very cool! You will like it!",
      "Ooh no...",
      "Sure",
      "I watched this movie when it was still under the title of 'Relive'. A cop learns his niece and her parents are killed. He soon starts receiving phone calls from his dead niece. Is it her ghost calling from the other side? No, it's her calling from the past, two weeks before her and her family are killed. The cop then tries to prevent their murder.",
      "I saw this movie at Sundance, and it kept me interested the whole time. The story is very complex, and the movie was very well done. I recommend this movie if you like intensity.",
      "I have no idea :(",
      "An amazing, mind-bending, brain-teaser of a movie that I saw at the Sundance Film Festival. A Los Angeles police detective discovers the murder of his brother, sister-in-law, and niece. Shortly afterwards, he begins to receive phone calls from his dead niece. Is our hero crazy?",
      "btw how a u?",
      "Really???",
      "I can't wrap my head around why so many people hate this movie. It's almost as if we saw two completely different films. While the writing was nothing to write home about, the delivery from the cast was rather well executed. The cinematography was fantastic. The soundtrack was wonderful. The premise was intriguing, albeit not all too original, and although it seemed quite rushed especially in the latter half of the film, it was still quite enjoyable. This film deserves more credit than it's receiving and I would hope any and all who may be reading this would give the film a chance before blowing it off based on all these bad reviews.",
      "The cast did an amazing job. Was a really good concept. Not completely original, but had original components. Could've been a 10 had the story been developed a bit more and the score not have been so sleepy.",
      "Lets discuss movie yoy saw yesterday",
      "What is your opinion?",
      "Whyyy?",
      ")",
      "I am angry!",
      "(",
      "Have you watched series about Chernobyl?",
      "'Chernobyl' is scarier than most horror movies in that it is a dramatization of actual, real-life horror experienced by thousands of people on that fateful April 1986 morning and the years that followed. This disaster has haunted the nation, Europe, and the rest of mankind more than three decades later. And that creeping dread permeates the whole show. It's difficult to watch. But it certainly makes it a must-watch.",
      "What is so terrifying is it's not trying to be a horror programme, it's what actually happened. It's not gratuitous... it's what happened. And it's scarier than any horror movie I could ever call to mind. There are scenes where my blood ran cold, where I felt queasy but most of all I was just horrified by the scenes that depicted those first on the scene. You always look for the helpers in any disaster. But what if the disaster overcomes the helpers. What if even the strongest of us are no match for the horrific event. It's almost unthinkable. But it happened here. This will stick with you long after the credits roll. As it should.",
      "So cool!",
      "I like it, but I am not exciting"
    ];

    const REACTION_TYPES = ["laugh", "fire", "claps"];

    const chats = await getCustomRepository(ChatRepository).find({
      relations: ["user1", "user2"]
    });

    const stories = await getCustomRepository(StoryRepository).find();

    for (const chat of chats) {
      const messagesNumber = Math.floor(Math.random() * 100);
      const randomMessage1 = Math.floor(Math.random() * messagesNumber);
      const randomMessage2 = Math.floor(Math.random() * messagesNumber);
      for (let i = 0; i < messagesNumber; i++) {
        const message = new Message();
        message.body = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
        message.user =
          Math.floor(Math.random() * 2) === 0 ? chat.user1 : chat.user2;
        message.chat = chat;
        message.isRead = true;
        if (i === randomMessage1) {
          message.story = stories[Math.floor(Math.random() * stories.length)];
        }
        if (i === randomMessage2) {
          message.story = stories[Math.floor(Math.random() * stories.length)];
          message.reactionType =
            REACTION_TYPES[Math.floor(Math.random() * REACTION_TYPES.length)];
        }
        await getCustomRepository(MessageRepository).save(message);
      }
    }

    // set custom dates
    const DAYS = [28, 29, 30, 31];
    const messages = await getCustomRepository(MessageRepository).find();

    for (const message of messages) {
      const newDate = new Date(
        2019,
        6,
        DAYS[Math.floor(Math.random() * DAYS.length)],
        Math.floor(Math.random() * 24),
        Math.floor(Math.random() * 60),
        Math.floor(Math.random() * 60)
      );
      await getCustomRepository(MessageRepository).update(message.id, {
        created_at: newDate
      });
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
