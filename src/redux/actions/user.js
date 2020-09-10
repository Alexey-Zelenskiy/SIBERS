import USER_CONSTANTS from "../constants/user";

export const LOADED_USER = "LOADED_USER";
export const SET_ID = "SET_ID";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";
export const SET_USER = "SET_USER";

const usersLoaded = (users) => {
  return {
    type: LOADED_USER,
    payload: users,
  };
};
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
const setUserId = (idX) => {
  return {
    type: SET_ID,
    payload: idX,
  };
};

export { usersLoaded, setUserId, setUser };
