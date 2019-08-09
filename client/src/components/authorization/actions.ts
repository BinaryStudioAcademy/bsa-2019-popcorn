import {FETCH_LOGIN} from "./actionTypes";

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