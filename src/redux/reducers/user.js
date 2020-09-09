import { LOADED_USER, SET_ID, EDIT_USER, DELETE_USER } from "../actions/user";

const initialState = {
  users: [],
  loading: true,
  error: false,
  idX: 0,
};

const user = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOADED_USER:
      return {
        ...state,
        users: payload,
      };
    case SET_ID:
      return {
        ...state,
        idX: payload,
      };
    case EDIT_USER:
      return {
        ...state,
        users: payload,
      };

    case DELETE_USER:
      return {
        ...state,
        users: payload,
      };
    default:
      return state;
  }
};
export default user;
