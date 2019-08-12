import tokenHelper from "./../helpers/token.helper";
import userRepository from "./../repository/user.repository";
import { getCustomRepository } from "typeorm";
import { User } from "../models/UserModel";
import { sendToken } from "./email.service";

const crypto = require("crypto");

export const login = async ({ id }) => ({
  token: tokenHelper.createToken({ id }),
  user: await getCustomRepository(userRepository).find({ id })
});

export const register = async (userData: User) => {
  const newUser = await getCustomRepository(userRepository).save(userData);
  return login(newUser);
};

export const reset = async (email: string) => {
  const user = await getCustomRepository(userRepository).getByEmail(email);

  if (!user) throw new Error("Not Found");

  const token = (await crypto.randomBytes(20)).toString("hex");
  await getCustomRepository(userRepository).updateById(user.id, {
    reset_token: token
  });

  await sendToken(email, token);
};

export const restore = async (password: string, token: string) => {
  console.log(password, token);
  const repository = await getCustomRepository(userRepository);
  const user = await repository.getByToken(token);

  if (!user) throw new Error("Invalid token");

  await repository.updateById(user.id, { password });
};
