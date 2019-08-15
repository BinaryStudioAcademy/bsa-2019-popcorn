import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { EventVisitor } from "../entities/Events";

@EntityRepository(EventVisitor)
class EventVisitorRepository extends Repository<EventVisitor> {
  async getEventIdsByVisitorId(userId: string): Promise<Array<string>> {
    const eventVisitors = await this.find({ userId });
    return eventVisitors.map(eventVisitor => eventVisitor.eventId);
  }
}

export default EventVisitorRepository;
