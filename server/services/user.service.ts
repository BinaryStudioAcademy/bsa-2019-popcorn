import {User} from '../models/UserModel';
import UserRepository from '../repository/user.repository';
import {getCustomRepository} from "typeorm";

interface IResponse {
    data: { user?: User, users?: User[] },
    success: boolean,
    error: string
}

export const createUser = async (user: User): Promise<User> => {
    return await getCustomRepository(UserRepository)
        .save(user);
};

export const getUsers = async (): Promise<IResponse> => {
    return await getCustomRepository(UserRepository)
        .getUsers();
};

export const getUserById = async (id: string): Promise<IResponse> => {
    return await getCustomRepository(UserRepository)
        .getUserById(id);
};

export const updateById = async (id: string, body: any): Promise<IResponse> => {
    return await getCustomRepository(UserRepository)
        .updateById(id, body);
};

export const deleteById = async (id: string): Promise<IResponse> => {
    return await getCustomRepository(UserRepository)
        .deleteById(id);
};

export const getByEmail = async (email): Promise<User> => {
    return await getCustomRepository(UserRepository)
    .findOne({email});
}

export const getByUserName = async (name): Promise<User> => {
    return await getCustomRepository(UserRepository)
    .findOne({ name });
}

