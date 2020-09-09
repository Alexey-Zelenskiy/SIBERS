import React, { useEffect, useRef } from "react";
import "./user-list.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../../redux/actions/user";
import user from "../../redux/reducers/user";
const ContactList = (props) => {
  const users = useSelector((state) => state.user.users);
  const ref = useRef();
  const elements = users
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((item, index) => {
      return (
        <li ref={ref} key={index}>
          <img src={item.avatar} />
          <h1>{item.name}</h1>
          {item.favorite ? (
            <img className="star" src={require("../../img/star.jpg")} />
          ) : null}
          <Link to="/user">
            <img
              src={require("../../img/edit.jpg")}
              onClick={() => dispatch(setUserId(index))}
            />
          </Link>
        </li>
      );
    });
  const dispatch = useDispatch();
  return (
    <div style={{ width: "98%", display: "flex" }}>
      <ul>{elements}</ul>
    </div>
  );
};

export { ContactList };
