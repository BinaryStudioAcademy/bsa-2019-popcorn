import { User } from "../models/UserModel";
import UserRepository from "../repository/user.repository";
import { getCustomRepository } from "typeorm";

interface IResponse {
  data: { user?: User; users?: User[] };
  success: boolean;
  error: string;
}

export const createUser = async (user: User): Promise<User> => {
  return await getCustomRepository(UserRepository).save(user);
};

export const getUsers = async (): Promise<IResponse> => {
  return await getCustomRepository(UserRepository).getUsers();
};

export const getUserById = async (id: string): Promise<IResponse> => {
  return await getCustomRepository(UserRepository).getUserById(id);
};
export const getUserByName = async (name: string): Promise<User[]> => {
  return await getCustomRepository(UserRepository).find({
    where: `name ILIKE '%${name}%'` 
  });
};

export const updateById = async (id: string, body: any): Promise<IResponse> => {
  return await getCustomRepository(UserRepository).updateById(id, body);
};

export const deleteById = async (
  id: string,
  user: User,
  next
): Promise<IResponse> => {
  if (id !== user.id) {
    return next({ status: 401, message: "Permision denied." }, null);
  }

  return await getCustomRepository(UserRepository).deleteById(id);
};

export const getByEmail = async (email): Promise<User> => {
  return await getCustomRepository(UserRepository).findOne({ email });
};

export const getByUserName = async (name): Promise<User> => {
  return await getCustomRepository(UserRepository).findOne({ name });
};

export const updateEmail = async (
  userId: string,
  user: User,
  email: string,
  next
) => {
  if (userId !== user.id) {
    return next({ status: 401, message: "Permision denied." }, null);
  }

  const userByEmail = await getByEmail(email);
  if (userByEmail) {
    return next({ status: 401, message: "Email is already taken." }, null);
  }
  return await getCustomRepository(UserRepository).updateById(user.id, {
    email,
    reset_token: ""
  });
};

export const updatePassword = async (
  userId: string,
  user: User,
  password: string,
  next
) => {
  if (userId !== user.id) {
    return next({ status: 401, message: "Permision denied." }, null);
  }

  if (password.length < 6) {
    return next(
      { status: 401, message: "Password shoud contain min 6 symbols" },
      null
    );
  }
  return await getCustomRepository(UserRepository).updateById(user.id, {
    password,
    reset_token: ""
  });
};

interface IUserNotificationSettings {
  emailNotificationNews?: boolean;
  emailNotificationUpdatesFromFollowed?: boolean;
  emailNotificationComments?: boolean;
  emailNotificationEvents?: boolean;
  siteNotificationUpdatesFromFollowed?: boolean;
  siteNotificationComments?: boolean;
  siteNotificationEvents?: boolean;
}

export const updateNotificationSettings = async (
  userId: string,
  user: User,
  newSettings: IUserNotificationSettings,
  next
) => {
  if (userId !== user.id) {
    return next({ status: 401, message: "Permision denied." }, null);
  }

  const newData = { ...user, ...newSettings };
  if (newData.favoriteLists) {
    delete newData.favoriteLists;
  }
  return await getCustomRepository(UserRepository).updateById(userId, newData);
};

type Privacy = "All" | "Followers" | "Only me";

interface IUserPrivacySettings {
  privacyProfileInfo?: Privacy;
  privacyMyPosts?: Privacy;
  privacyStories?: Privacy;
  privacyEvents?: Privacy;
  privacySurveys?: Privacy;
  privacyTops?: Privacy;
  privacyCollections?: Privacy;
  privacyWatchlist?: Privacy;
  privacyReviews?: Privacy;
  privacyMessages?: Privacy;
}

export const updatePrivacySettings = async (
  userId: string,
  user: User,
  newSettings: IUserPrivacySettings,
  next
) => {
  if (userId !== user.id) {
    return next({ status: 401, message: "Permision denied." }, null);
  }

  const newData = { ...user, ...newSettings };
  if (newData.favoriteLists) {
    delete newData.favoriteLists;
  }
  return await getCustomRepository(UserRepository).updateById(userId, newData);
};
