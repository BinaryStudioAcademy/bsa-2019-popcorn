import { NotificationModel } from "../models/NotificationModel";
import NotificationRepository from "../repository/notification.repository";
import { getCustomRepository, DeleteResult } from "typeorm";

export const saveNotificitation = async (
  notification: any
): Promise<NotificationModel> => {
  const newNotification = await getCustomRepository(
    NotificationRepository
  ).save(notification);
  return newNotification;
};

export const setNotificitationIsRead = async (
  notificationId: string
): Promise<any> => {
  let notification = await getCustomRepository(NotificationRepository).findOne({
    id: notificationId
  });
  notification.isRead = true;
  return await getCustomRepository(NotificationRepository).save(notification);
};

export const getNotificationsByUserId = async (
  userId: string
): Promise<NotificationModel[]> => {
  return await getCustomRepository(NotificationRepository).find({ userId });
};
