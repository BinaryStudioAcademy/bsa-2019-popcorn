import {FETCH_LOGIN, FETCH_USER_BY_TOKEN} from "./actionTypes";

interface IValues {
    email: string;
    password: string;
}

export const authorize = (values: IValues): any => {
    return {
        type: FETCH_LOGIN,
        payload:{
            ...values
        }
    }
};


export const fetchByToken = (token : string):any => {
    return {
        type: FETCH_USER_BY_TOKEN,
        payload:{
            token
        }
    }
};