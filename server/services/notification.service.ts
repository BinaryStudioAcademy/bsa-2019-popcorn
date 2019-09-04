import { NotificationModel } from "../models/NotificationModel";
import NotificationRepository from "../repository/notification.repository";
import { getCustomRepository } from "typeorm";

export const saveNotification = async (
  notification: any
): Promise<NotificationModel> => {
  const newNotification = await getCustomRepository(
    NotificationRepository
  ).save(notification);
  return newNotification;
};

export const setNotificationIsRead = async (
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
  return await getCustomRepository(NotificationRepository).find({
    where: { userId },
    order: { date: "DESC" }
  });
};
