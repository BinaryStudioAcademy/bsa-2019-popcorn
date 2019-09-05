import tokenHelper from "./../helpers/token.helper";
import userRepository from "./../repository/user.repository";
import { getCustomRepository } from "typeorm";
import * as emailService from "./email.service";
import { User } from "../models/UserModel";

import crypto from "crypto";

export const login = async (user: User) => ({
  token: tokenHelper.createToken({ id: user.id }),
  user: await getCustomRepository(userRepository).find({ id: user.id })
});

export const register = async (userData: User) => {
  const newUser = await getCustomRepository(userRepository).save(userData);

  if (newUser) {
    emailService.sendWelcomeEmail(newUser.email);
  }

  return login(newUser);
};

export const reset = async (email: string) => {
  const user = await getCustomRepository(userRepository).getByEmail(email);

  if (!user) {
    throw new Error("Not Found");
  }

  const token = (await crypto.randomBytes(20)).toString("hex");
  await getCustomRepository(userRepository).updateById(user.id, {
    reset_token: token
  });

  await emailService.sendToken(email, token);
};

export const restore = async (password: string, token: string) => {
  console.log(password, token);
  const repository = await getCustomRepository(userRepository);
  const user = await repository.getByToken(token);

  if (!user) {
    throw new Error("Invalid token");
  }

  await repository.updateById(user.id, { password, reset_token: "" });
};
