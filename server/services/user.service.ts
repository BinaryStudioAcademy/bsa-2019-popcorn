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

export const updateById = async (id: string, body: any): Promise<IResponse> => {
  return await getCustomRepository(UserRepository).updateById(id, body);
};

export const deleteById = async (id: string): Promise<IResponse> => {
  return await getCustomRepository(UserRepository).deleteById(id);
};

export const getByEmail = async (email): Promise<User> => {
  return await getCustomRepository(UserRepository).findOne({ email });
};

export const getByUserName = async (name): Promise<User> => {
  return await getCustomRepository(UserRepository).findOne({ name });
};

export const updateEmail = async (user: User, email: string, next) => {
  const userByEmail = await getByEmail(email);
  if (userByEmail) {
    return next({ status: 401, message: "Email is already taken." }, null);
  }
  return await getCustomRepository(UserRepository).updateById(user.id, {
    email,
    reset_token: ""
  });
};

export const updatePassword = async (user: User, password: string, next) => {
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
