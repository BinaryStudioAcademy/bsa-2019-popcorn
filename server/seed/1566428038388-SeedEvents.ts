import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import EventRepository from "../repository/event.repository";
import UserRepository from "../repository/user.repository";
import { Event, EventVisitor } from "../models/Events";
import EventVisitorRepository from "../repository/eventVisitor.repository";
export class SeedEvents1566428038388 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const eventsSeed = [
      {
        title: "The Matrix",
        description:
          "The Matrix 4 is officially confirmed with Keanu Reeves reprising his role as Neo.Celebrate at The Matrix - 20th Anniversary Screening at EVENT this FRIDAY!",
        image: "https://i.imgur.com/1sQUNj2g.jpg",
        location_lat: 53.189182,
        location_lng: 50.118766,
        start_date: new Date("2019-08-24 22:00:00"),
        end_date: new Date("2019-08-24 22:00:00"),
        isPrivate: false,
        userId: "",
        movieId: null
      },
      {
        title: "Rosslyn Cinema - Outdoor Movie Festival",
        description:
          "Every Friday this summer in Gateway Park, bring a blanket or low chairs and a group of friends to enjoy a night under the stars with your favorite movies.",
        image:
          "https://www.rosslynva.org/_files/images/35099389492_07d627fef1_z.jpg",
        location_lat: 53.189182,
        location_lng: 50.118766,
        start_date: new Date("2019-08-24 22:00:00"),
        end_date: new Date("2019-08-24 22:00:00"),
        isPrivate: false,
        movieId: null
      },
      {
        title: "Movies in Clark Park",
        description:
          "UCD, in partnership with Philadelphia Parks and Recreation and Friends of Clark Park, will once again present Movies in Clark Park, four Fridays of free outdoor movies running from August 9th through August 30th.",
        image:
          "https://www.universitycity.org/sites/default/files/styles/page_slider/public/Movies_Night_at_Clark_Park_August2015-62.jpg?itok=HhGk8rg-",
        location_lat: 53.189182,
        location_lng: 50.118766,
        start_date: new Date("2019-08-9 10:00:00"),
        end_date: new Date("2019-08-30 22:00:00"),
        isPrivate: false,
        movieId: null
      },
      {
        title:
          "Cool Thursdays Concert Series | Dallas Arboretum and Botanical Garden",
        description: "",
        image:
          "https://dallasarboretum.imgix.net/wp-content/uploads/2019/01/21003007/sponsor-daytime_concert_for_social_dallas_arboretum.jpg?fit=crop&crop=entropy&q=60&auto=format&w=1615&h=584",
        location_lat: 53.189182,
        location_lng: 50.118766,
        start_date: new Date("2019-08-24 22:00:00"),
        end_date: new Date("2019-08-24 22:00:00"),
        isPrivate: false,
        movieId: null
      }
    ];

    eventsSeed.map(async eventData => {
      const event = new Event();
      event.title = eventData.title;
      event.description = eventData.description;
      event.image = eventData.image;
      event.location_lat = eventData.location_lat;
      event.location_lng = eventData.location_lng;
      event.start_date = eventData.start_date;
      event.end_date = eventData.end_date;
      event.isPrivate = eventData.isPrivate;
      const users = await getCustomRepository(UserRepository).find();
      function getUserId() {
        return users[Math.floor(Math.random() * users.length)].id;
      }

      const randomInteger = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };

      event.userId = getUserId();
      const newEvent = await getCustomRepository(EventRepository).save(event);

      const visitors = new Set([
        event.userId,
        ...users.map(user => user.id).slice(0, randomInteger(3, 9))
      ]);

      visitors.forEach(async userId => {
        const visitor = new EventVisitor();
        visitor.eventId = newEvent.id;
        visitor.userId = userId;
        visitor.status = "going";
        await getCustomRepository(EventVisitorRepository).save(visitor);
      });
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
