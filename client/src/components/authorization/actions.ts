import {FETCH_LOGIN, FETCH_USER_BY_TOKEN, FETCH_REGISTRATION} from "./actionTypes";
import uuid from 'uuid/v4';

interface IValues {
    email: string;
    password: string;
}

interface IValuesWithName {
    email: string;
    password: string;
    name: string
}

export const authorize = (values: IValues): any => {
    return {
        type: FETCH_LOGIN,
        payload: {
            ...values
        }
    }
};


export const fetchByToken = (token: string): any => {
    return {
        type: FETCH_USER_BY_TOKEN,
        payload: {
            token
        }
    }
};

export const registration = (value: IValuesWithName): any => {
    const user = {
        id:uuid(),
        ...value,
        location: "",
        aboutMe: "",
        tops: []
    };

    return {
        type: FETCH_REGISTRATION,
        payload: user
    }
};