import tokenHelper from './../helpers/token.helper';
import userRepository from './../repository/user.repository';
import {getCustomRepository} from "typeorm";

export const login = async ({ id }) => ({
    token: tokenHelper.createToken({ id }),
    user: await getCustomRepository(userRepository).find({ id })
});

export const register = async (userData) => {
    const newUser = await getCustomRepository(userRepository).save(userData);
    return login(newUser);
};
