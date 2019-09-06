import { Event, EventComment, EventVisitor } from "../models/Events";
import {
  EventComment as CommentEntity,
  EventVisitor as VisitorEntity
} from "../entities/Events";

import EventRepository from "../repository/event.repository";
import { getRepository, getCustomRepository } from "typeorm";

export const getAllEvents = async (): Promise<any[]> =>
  await getCustomRepository(EventRepository).getAllEvents();

export const getEventsByUserId = async (userId: string): Promise<any[]> => {
  const myEvents = await getCustomRepository(EventRepository).getEvents(userId);
  const interestedEvents = await getEventsByVisitorId(userId);
  return myEvents.concat(interestedEvents);
};

export const getEventById = async (eventId: string): Promise<Event> =>
  await getCustomRepository(EventRepository).getEvent(eventId);

export const getEventByTitle = async (title: string): Promise<Event[]> =>
  await getCustomRepository(EventRepository).getEventByTitle(title);

export const createEvent = async (event: any): Promise<Event> => {
  const responseEvent = await getCustomRepository(EventRepository).save(event);
  const newVisitor = {
    status: "going",
    userId: responseEvent.userId,
    eventId: responseEvent.id
  };
  const visitor = await createVisitor(newVisitor as any);
  return { ...responseEvent, eventVisitors: visitor };
};

export const updateEvent = async (updatedEvent: Event): Promise<Event[]> => {
  let event = await getCustomRepository(EventRepository).findOne(
    updatedEvent.id
  );
  event = { ...event, ...updatedEvent };
  return await getCustomRepository(EventRepository).save([event]);
};

export const deleteEventById = async (eventId: number): Promise<Event> => {
  const event = await getCustomRepository(EventRepository).findOne(eventId);
  return await getCustomRepository(EventRepository).remove(event);
};

// comments

export const getCommentsByEventId = async (
  eventId: string
): Promise<EventComment[]> =>
  await getRepository(CommentEntity).find({ eventId });

export const createComment = async (
  comment: EventComment
): Promise<EventComment> => await getRepository(CommentEntity).save(comment);

export const updateComment = async (
  updatedComment: Event
): Promise<EventComment[]> => {
  let comment = await getRepository(CommentEntity).findOne(updatedComment.id);
  comment = { ...comment, ...updatedComment };
  return await getRepository(CommentEntity).save([comment]);
};

export const deleteCommentById = async (
  commentId: number
): Promise<EventComment> => {
  const comment = await getRepository(CommentEntity).findOne(commentId);
  return await getRepository(CommentEntity).remove(comment);
};

// visitors

export const getVisitorsByEventId = async (
  eventId: string
): Promise<EventVisitor[]> =>
  await getRepository(VisitorEntity).find({ eventId });

export const getEventsByVisitorId = async (userId: string): Promise<any[]> => {
  const visitorEvents = await getCustomRepository(
    EventRepository
  ).getEventsByVisitorId(userId);
  const result = visitorEvents.map(visitorEvent => visitorEvent.event);
  return result;
};

export const createVisitor = async (visitor: EventVisitor): Promise<any> => {
  const oldVisitor = await getRepository(VisitorEntity).findOne({
    userId: visitor.userId,
    eventId: visitor.eventId
  });
  oldVisitor && oldVisitor.id ? (visitor.id = oldVisitor.id) : null;
  return await getRepository(VisitorEntity).save(visitor);
};

export const updateVisitor = async (
  updatedVisitor: EventVisitor
): Promise<EventVisitor[]> => {
  let visitor = await getRepository(VisitorEntity).findOne(updatedVisitor.id);
  visitor = { ...visitor, status: updatedVisitor.status };
  return await getRepository(VisitorEntity).save([visitor]);
};

export const deleteVisitorById = async (
  visitorId: number
): Promise<EventVisitor> => {
  const visitor = await getRepository(VisitorEntity).findOne(visitorId);
  return await getRepository(VisitorEntity).remove(visitor);
};
