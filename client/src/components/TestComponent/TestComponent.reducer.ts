import { fetchTest } from './../../redux/routines';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case fetchTest.TRIGGER:
      return {
        ...state,
        loading: true,
      };
    case fetchTest.SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case fetchTest.FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case fetchTest.FULFILL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
