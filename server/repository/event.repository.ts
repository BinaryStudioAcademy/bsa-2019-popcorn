import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { Event, EventComment, EventVisitor } from "../entities/Events";
import { getRepository, createQueryBuilder } from "typeorm";
import EventVisitorRepository from "./eventVisitor.repository";

@EntityRepository(Event)
class EventRepository extends Repository<Event> {
  async getEvent(eventId: string): Promise<Event> {
    return await getRepository(Event)
      .createQueryBuilder("event")
      .leftJoinAndSelect("event.eventComments", "comments")
      .leftJoinAndSelect("event.eventVisitors", "visitors")
      .where("event.id = :id", { id: eventId })
      .getOne();
  }

  async getEventsByVisitorId(userId: string): Promise<Event[]> {
    const interestedEventIds = await getCustomRepository(
      EventVisitorRepository
    ).getEventIdsByVisitorId(userId);

    const interestedEvents = await Promise.all(
      interestedEventIds.map(interestedEventId =>
        this.getEvent(interestedEventId)
      )
    );

    return [...interestedEvents];
  }
  // async getEventsByVisitorId(userId: string): Promise<Event[]> {
  //   return await getRepository(Event)
  //     .createQueryBuilder("event")
  //     .innerJoinAndSelect("event.eventVisitors", "visitors")
  //     .where("visitors.userId = :id", { id: userId })
  //     .getMany();
  // }
  async getEvents(userId: string): Promise<Event[]> {
    return await getRepository(Event)
      .createQueryBuilder("event")
      .leftJoinAndSelect("event.eventVisitors", "visitors")
      .where("event.userId = :id", { id: userId, isPrivate: "true" })
      .getMany();
  }
  async getEvents(userId: string): Promise<Event[]> {
    return await getRepository(Event)
      .createQueryBuilder("event")
      .leftJoinAndSelect("event.eventVisitors", "visitors")
      .where("event.userId = :id", { id: userId })
      .getMany();
  }
}

export default EventRepository;
