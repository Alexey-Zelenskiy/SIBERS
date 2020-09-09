import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EDIT_USER, DELETE_USER } from "../actions/user";
export function useUser() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user.users);

  const removeUser = (idx) => {
    const updatedEventsData = data.filter((item, index) => idx !== index);
    return dispatch({
      type: DELETE_USER,
      payload: updatedEventsData,
    });
  };
  const editUser = (newItem) => {
    const updatedEventsData = data.map((item, index) => {
      if (index === newItem.id) {
        return {
          ...item,
          ...newItem,
        };
      } else {
        return item;
      }
    });
    return dispatch({
      type: EDIT_USER,
      payload: updatedEventsData,
    });
  };
  return { removeUser, editUser };
}
