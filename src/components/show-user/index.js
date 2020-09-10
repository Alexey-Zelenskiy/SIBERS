import React, { useEffect, useRef, useState } from "react";
import "./user.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../../redux/hooks/user";
const ShowUser = () => {
  const dispatch = useDispatch();
  const onValueChangeName = (e) => {
    setName(e.target.value);
  };

  const { editUser } = useUser();
  const onSubmitName = (e) => {
    e.preventDefault();
  };
  const onValueChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const onSubmitPhone = (e) => {
    e.preventDefault();
  };
  const onValueChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onSubmitEmail = (e) => {
    e.preventDefault();
  };
  const onValueChangeUser = (e) => {
    setCompanyUser(e.target.value);
  };

  const onSubmitUser = (e) => {
    e.preventDefault();
  };
  const tmpFaforite = (item) => {
    setFavorite(!item);
  };
  const user = useSelector((state) => state.user.user);
  const idX = useSelector((state) => state.user.idX);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [username, setCompanyUser] = useState(user.username);
  const [favorite, setFavorite] = useState(user.favorite);
  const onSave = () => {
    editUser({
      id: user.id,
      name: name,
      phone: phone,
      email: email,
      favorite: favorite,
    });
  };
  return (
    <div
      style={{
        width: "95%",
        display: "block",
        justifyContent: "center",
        alignItems: "start",
        height: "75%",
        overflow: "scroll",
      }}
    >
      {favorite ? (
        <img
          src={require("../../img/star.jpg")}
          className="favorit"
          onClick={() => tmpFaforite(favorite)}
        />
      ) : (
        <img
          src={require("../../img/gray_star.png")}
          className="favorit"
          onClick={() => tmpFaforite(favorite)}
        />
      )}
      <img src={user.avatar} className="ava" />
      <form onSubmit={onSubmitName}>
        <input
          type="text"
          placeholder={name}
          onChange={onValueChangeName}
          value={name}
          className="name"
        />
      </form>
      <div className="info">
        <p>Сотовый</p>
        <form onSubmit={onSubmitPhone}>
          <input
            type="text"
            placeholder={phone}
            onChange={onValueChangePhone}
            value={phone}
            className="info_text"
          />
        </form>
      </div>
      <div className="info">
        <p>Email</p>
        <form onSubmit={onSubmitEmail}>
          <input
            type="text"
            placeholder={email}
            onChange={onValueChangeEmail}
            value={email}
            className="info_text"
          />
        </form>
      </div>
      <div className="info">
        <p>Username</p>
        <form onSubmit={onSubmitUser}>
          <input
            type="text"
            placeholder={username}
            onChange={onValueChangeUser}
            value={username}
            className="info_text"
          />
        </form>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/">
          <button className="back">Back</button>
        </Link>
        <Link to="/">
          <button className="save" onClick={onSave}>
            Save
          </button>
        </Link>
      </div>
    </div>
  );
};

export { ShowUser };
