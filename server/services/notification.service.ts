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
): Promise<DeleteResult> => {
  return await getCustomRepository(NotificationRepository).delete({
    id: notificationId
  });
};

export const getNotificationsByUserId = async (
  userId: string
): Promise<NotificationModel[]> => {
  return await getCustomRepository(NotificationRepository).find({ userId });
};
