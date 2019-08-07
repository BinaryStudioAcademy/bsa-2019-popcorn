import {User} from '../models/UserModel';
import UserRepository from '../repository/user.repository';
import {getCustomRepository} from "typeorm";

export const createUser = async (user: User): Promise<User> => {
    return await getCustomRepository(UserRepository)
        .save(user);
};

export const getUsers = async (): Promise<User[]> => {
    return await getCustomRepository(UserRepository)
        .getUsers();
};

export const getUserById = async (id: string): Promise<User> => {
    return await getCustomRepository(UserRepository)
        .getUserById(id);
};

export const updateById = async (id: string, body: any): Promise<any> => {
    return await getCustomRepository(UserRepository)
        .updateById(id, body);
};

export const deleteById = async (id: string): Promise<any> => {
    return await getCustomRepository(UserRepository)
        .deleteById(id);
};



