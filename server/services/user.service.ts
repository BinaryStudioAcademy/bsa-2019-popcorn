import {User} from '../models/UserModel';
import UserRepository from '../repository/user.repository';
import {getCustomRepository} from "typeorm";

export const createUser = async (user: User): Promise<User> => {
    return await getCustomRepository(UserRepository)
        .save(user);
};

export const getUsers = async (): Promise<User[]> => {
    return await getCustomRepository(UserRepository)
        .find();
};

export const getById = async (id): Promise<User> => {
    return await getCustomRepository(UserRepository)
    .findOne({id});
}

export const getByEmail = async (email): Promise<User> => {
    return await getCustomRepository(UserRepository)
    .findOne({email});
}

export const getByUserName = async (username): Promise<User> => {
    return await getCustomRepository(UserRepository)
    .findOne({ username });
}