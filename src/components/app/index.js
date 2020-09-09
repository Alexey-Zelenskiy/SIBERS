import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import { usersLoaded } from "../../redux/actions/user";
import ErrorMessage from "../errorMessage";
import Spinner from "../spinner";
import { createBrowserHistory } from "history";
import { ContactList } from "../user-list";
import { ShowUser } from "../show-user";
import moment from "moment";

function App() {
  const history = createBrowserHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dataLoaded();
  }, []);

  const tabBar = [
    {
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
        setError(false);
        setLoading(false);
      })
      .catch((reason) => {
        setError(true);
        setLoading(false);
      });
  }

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={ContactList} />
        <Route path="/user" exact component={ShowUser} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  ) : null;

  return (
    <div className="App">
      <div className="chelka">
        <div
          style={{
            width: "20%",
            height: "30%",
            backgroundColor: "black",
            borderRadius: 20,
          }}
        />
      </div>
      <div className="top">
        <a className="time">{moment().format("HH:mm")}</a>
      </div>
      <header>
        <h1 className="header">Контакты</h1>
      </header>
      {errorMessage}
      {spinner}
      {content}
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          height: 68,
          backgroundColor: "#969696",
          borderBottomLeftRadius: 45,
          borderBottomRightRadius: 45,
          alignItems: "center",
        }}
      >
        {tabBar.map((item, index) => {
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
        })}
      </div>
    </div>
  );
}

export default App;

// const View = ({initialBalance, percentRange, balance}) => {

//   let classNames = 'more';
//   let btnClass = 'target_btn';

//   if (initialBalance === 15) {
//     classNames = 'more_none';
//     btnClass += ' color';
//   }
//   return (
//     <>
//       <div id='target'>
//         <header className="header"><h4 className='target_text'>Target indicator Demo</h4></header>
//         <div className="inside">
//           <div className="inside_block">
//             <p>Reached: <span className="progress-bar"><div className="range" style={{width: `${percentRange}%`}}/>
//               <div className="range_money" style={{width: `${percentRange}%`, textAlign: 'end', fontSize: '13px'}}>
//                 {percentRange > 0 ? <div>
//                   <i className="fa fa-sort-asc" aria-hidden="true"/>
//                 <div className='target_money'>${initialBalance}</div>
//                 </div> : null}
//               </div>
//             </span>
//             </p>
//             <div className={btnClass}>
//               <header>
//                 <a>Target</a>
//               </header>
//               <div className='money'>$15</div>
//             </div>
//           </div>
//           <div className={classNames}><i className="fa fa-info-circle" aria-hidden="true"/>  You need $1 more to reach
//             your target.
//           </div>
//         </div>
//       </div>
//     </>
//   )
// };
