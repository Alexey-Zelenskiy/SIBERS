import React, { useEffect, useRef, useState } from "react";
import "./user-list.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/actions/user";

const ContactList = (props) => {
  const users = useSelector((state) => state.user.users);
  const ref = useRef();
  const [value, setValue] = useState(null);
  // const elements = users
  //   .sort((a, b) => a.name.localeCompare(b.name))
  //   .map((item, index) => {
  //     return (
  //       <li ref={ref} key={index}>
  //         <img src={item.avatar} />
  //         <h1>{item.name}</h1>
  //         {item.favorite ? (
  //           <img className="star" src={require("../../img/star.jpg")} />
  //         ) : null}
  //         <Link to="/user">
  //           <img
  //             src={require("../../img/edit.jpg")}
  //             onClick={() => {
  //               dispatch(setUserId(index));
  //               dispatch(
  //                 setUser({
  //                   name: item.name,
  //                   phone: item.phone,
  //                   email: item.email,
  //                   favorite: item.favorite,
  //                   username: item.username,
  //                 })
  //               );
  //             }}
  //           />
  //         </Link>
  //       </li>
  //     );
  //   });
  const groupName = users.reduce((r, e) => {
    let group = e.name[0];
    if (!r[group]) r[group] = { group, children: [e] };
    else r[group].children.push(e);
    return r;
  }, []);
  const group = Object.values(groupName).map((item, index) => {
    return (
      <div ref={ref} key={index}>
        <h1 style={{ fontSize: 20, textAlign: "left" }}>{item.group}</h1>
        {item.children.map((item, index) => {
          return (
            <li>
              <img src={item.avatar} />
              <h1>{item.name}</h1>
              {item.favorite ? (
                <img className="star" src={require("../../img/star.jpg")} />
              ) : null}
              <Link to="/user">
                <img
                  src={require("../../img/edit.jpg")}
                  onClick={() =>
                    dispatch(
                      setUser({
                        avatar: item.avatar,
                        id: item.id,
                        name: item.name,
                        phone: item.phone,
                        email: item.email,
                        favorite: item.favorite,
                        username: item.username,
                      })
                    )
                  }
                />
              </Link>
            </li>
          );
        })}
      </div>
    );
  });
  const contactsSearch = () => {
    return users.filter((item, index) => {
      return (
        item.name.toLowerCase().indexOf(value) > -1 ||
        item.name.indexOf(value) > -1
      );
    });
  };
  const onValueChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };
  const dispatch = useDispatch();
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Введите имя"
          onChange={onValueChange}
          value={value}
          className="form-control search-btn "
        />
        <div className="search"></div>
      </form>
      <div style={{ width: "98%", display: "flex" }}>
        <ul>
          {value === null
            ? group
            : contactsSearch().map((item, index) => {
                return (
                  <div ref={ref} key={index}>
                    <h1 style={{ fontSize: 20, textAlign: "left" }}>
                      {item.group}
                    </h1>

                    <li>
                      <img src={item.avatar} />
                      <h1>{item.name}</h1>
                      {item.favorite ? (
                        <img
                          className="star"
                          src={require("../../img/star.jpg")}
                        />
                      ) : null}
                      <Link to="/user">
                        <img
                          src={require("../../img/edit.jpg")}
                          onClick={() => {
                            dispatch(
                              setUser({
                                avatar: item.avatar,
                                id: item.id,
                                name: item.name,
                                phone: item.phone,
                                email: item.email,
                                favorite: item.favorite,
                                username: item.username,
                              })
                            );
                          }}
                        />
                      </Link>
                    </li>
                  </div>
                );
              })}
        </ul>
      </div>
    </div>
  );
};

export { ContactList };
