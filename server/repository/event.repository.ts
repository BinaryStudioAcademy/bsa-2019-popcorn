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
  async getEventsByVisitorId(userId: string): Promise<EventVisitor[]> {
    return await getRepository(EventVisitor)
      .createQueryBuilder("event_visitor")
      .leftJoinAndSelect("event_visitor.event", "event")
      .where("event_visitor.userId = :id", { id: userId })
      .getMany();
  }
}

export default EventRepository;
