import React, {
  useEffect,
  useState
} from "react";
import {
  useDispatch
} from "react-redux";
import {
  Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./App.css";
import {
  usersLoaded
} from "../../redux/actions/user";
import ErrorMessage from "../errorMessage";
import Spinner from "../spinner";
import {
  createBrowserHistory
} from "history";
import {
  ContactList
} from "../user-list";
import {
  ShowUser
} from "../show-user";
import moment from "moment";

function App() {
  const history = createBrowserHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState(localStorage.getItem("contacts"));
  useEffect(() => {
    if (contacts) {
      dispatch(usersLoaded(JSON.parse(contacts)));
      setError(false);
      setLoading(false);
    } else {
      dataLoaded();
    }
  }, [contacts]);

  const tabBar = [{
      name: "Избранные",
    },
    {
      name: "Недавние",
    },
    {
      name: "Контакты",
      style: true,
    },
    {
      name: "Клавиши",
    },
    {
      name: "Автоответчик",
    },
  ];

  function dataLoaded() {
    fetch(`http://demo.sibers.com/users`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(usersLoaded(res));
        localStorage.setItem("contacts", JSON.stringify(res));
        setError(false);
        setLoading(false);
      })
      .catch((reason) => {
        setError(true);
        setLoading(false);
      });
  }

  const errorMessage = error ? < ErrorMessage / > : null;
  const spinner = loading ? < Spinner / > : null;
  const content = !(loading || error) ? ( <
    Router history = {
      history
    } >
    <
    Switch >
    <
    Route path = "/"
    exact component = {
      ContactList
    }
    /> <
    Route path = "/user"
    exact component = {
      ShowUser
    }
    /> <
    Redirect from = "*"
    to = "/" / >
    <
    /Switch> <
    /Router>
  ) : null;

  return ( <
    div className = "App" >
    <
    div className = "chelka" >
    <
    div style = {
      {
        width: "20%",
        height: "30%",
        backgroundColor: "black",
        borderRadius: 20,
      }
    }
    /> <
    /div> <
    div className = "top" >
    <
    a className = "time" > {
      moment().format("HH:mm")
    } < /a> <
    /div> <
    header >
    <
    h1 className = "header" > Контакты < /h1> <
    /header> {
      errorMessage
    } {
      spinner
    } {
      content
    } <
    div style = {
      {
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        height: 68,
        backgroundColor: "#969696",
        borderBottomLeftRadius: 45,
        borderBottomRightRadius: 45,
        alignItems: "center",
      }
    } >
    {
      /* {tabBar.map((item, index) => {
                return (
                  <div
                    style={{
                      marginLeft: 10,
                    }}
                    key={index}
                  >
                    <a style={{ fontSize: 14 }}>{item.name}</a>
                  </div>
                );
              })} */
    } <
    /div> <
    /div>
  );
}

export default App;