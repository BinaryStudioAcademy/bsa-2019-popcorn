import { EntityRepository, Repository } from "typeorm";
import { Event, EventComment, EventVisitor } from "../entities/Events";
import { getRepository, createQueryBuilder } from "typeorm";

@EntityRepository(Event)
class EventRepository extends Repository<Event> {
  async getEvent(eventId: number): Promise<Event> {
    return await getRepository(Event)
      .createQueryBuilder("event")
      .leftJoinAndSelect("event.eventComments", "comments")
      .leftJoinAndSelect("event.eventVisitors", "visitors")
      .where("event.id = :id", { id: eventId })
      .getOne();
  }
  async getEventsByVisitorId(userId: string): Promise<Event[]> {
    return await getRepository(Event)
      .createQueryBuilder("event")
      .innerJoinAndSelect("event.eventVisitors", "visitors")
      .where("visitors.userId = :id", { id: userId })
      .getMany();
  }
  async getEvents(userId: string): Promise<Event[]> {
    return await getRepository(Event)
      .createQueryBuilder("event")
      .leftJoinAndSelect("event.eventVisitors", "visitors")
      .where("event.userId = :id", { id: userId, isPrivate: "true" })
      .getMany();
  }
}

export default EventRepository;
