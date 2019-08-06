import {
    ADD_TEST
} from "./TestComponent.actionTypes";

export const addTest = (data: object) => ({
    type: ADD_TEST,
    payload: {
        data
    }
})
