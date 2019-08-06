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



