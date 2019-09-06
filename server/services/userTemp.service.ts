import { UserTemp } from "../models/UserModelTemp";
import UserTempRepository from "../repository/userTemp.repository";
import UserRepository from "../repository/user.repository";
import { getCustomRepository } from "typeorm";

export const createTempUser = async (user, body, id): Promise<UserTemp> => {
  const tempUser = new UserTemp();
  tempUser.userId = id;
  tempUser.password = body.password ? body.password : user.password;
  tempUser.email = body.email ? body.email : user.email;
  tempUser.token = body.token;
  return await getCustomRepository(UserTempRepository).save(tempUser);
};

export const updateUserByToken = async (token: string): Promise<any> => {
  const tempUser = await getCustomRepository(UserTempRepository).find({
    where: {
      token
    }
  });
  const realUser = await getCustomRepository(UserRepository).findOne(
    tempUser[0].userId
  );
  realUser.email = tempUser[0].email;
  realUser.password = tempUser[0].password;
  await getCustomRepository(UserTempRepository).remove(tempUser);
  return await getCustomRepository(UserRepository).save(realUser);
};
