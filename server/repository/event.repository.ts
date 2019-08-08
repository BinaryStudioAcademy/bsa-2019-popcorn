import { EntityRepository, Repository } from "typeorm";
import { Event,EventComment } from "../entities/Events";
import { getRepository, createQueryBuilder } from "typeorm";


@EntityRepository(Event)
class EventRepository extends Repository<Event> {
    async getEvent(eventId: number): Promise<Event> {
        return await getRepository(Event)
            .createQueryBuilder('event')
            .leftJoinAndSelect('event.eventComments', 'comments')
            .leftJoinAndSelect('event.eventVisitors', 'visitors')
            .where("event.id = :id", { id: eventId })
            .getOne();
    }

    
}


export default EventRepository;