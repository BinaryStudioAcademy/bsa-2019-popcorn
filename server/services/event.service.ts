import { Event, EventComment,EventVisitor } from '../models/Events';
import {
  Event as EventEntity,
  EventComment as CommentEntity,
  EventVisitor as VisitorEntity
} from '../entities/Events'
import EventRepository from '../repository/event.repository';
import { getRepository, getCustomRepository } from "typeorm";

export const getEvents = async (): Promise<Event[]> =>
  await getCustomRepository(EventRepository).find();

export const getEventById = async (eventId: number): Promise<Event> =>
  await getCustomRepository(EventRepository).getEvent(eventId);


export const createEvent = async (event: Event): Promise<Event[]> => {
  return await getCustomRepository(EventRepository).save([event])
}

export const updateEvent = async (updatedEvent: Event): Promise<Event[]> => {
  let event = await getCustomRepository(EventRepository).findOne(updatedEvent.id);
  event = { ...event, ...updatedEvent, };
  return await getCustomRepository(EventRepository).save([event])
}

export const deleteEventById = async (eventId: number): Promise<Event> => {
  const event = await getCustomRepository(EventRepository).findOne(eventId);
  return await getCustomRepository(EventRepository).remove(event);
}

export const createComment = async (comment: EventComment): Promise<EventComment[]> => {
  console.log(comment)
  return await getRepository(CommentEntity).save([comment]);
}

export const createVisitor = async (visitor: EventVisitor): Promise<EventVisitor[]> => {
  console.log(visitor)
  return await getRepository(VisitorEntity).save([visitor]);
}
