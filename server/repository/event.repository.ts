import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { Event, EventComment, EventVisitor } from "../entities/Events";
import { getRepository, createQueryBuilder } from "typeorm";
import EventVisitorRepository from "./eventVisitor.repository";

@EntityRepository(Event)
class EventRepository extends Repository<Event> {
  async getAllEvents(): Promise<Event[]> {
    return await getRepository(Event)
      .createQueryBuilder("event")
      .leftJoinAndSelect("event.eventComments", "comments")
      .leftJoinAndSelect("event.eventVisitors", "visitors")
      .getMany();
  }

  async getEvent(eventId: string): Promise<Event> {
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
      .leftJoinAndSelect("event.eventVisitors", "eventVisitors")
      .where("event_visitor.userId = :id", { id: userId })
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
