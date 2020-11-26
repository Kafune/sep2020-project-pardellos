/*global chrome*/
import React, { useState, useEffect } from "react";
import { loginUser } from "../serverCommunication";
import M from "materialize-css";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLoginUser(email, password) {
    loginUser(email, password)
      .then((response) => response.json())
      .then((response) => {
        chrome.storage.local.set({ cookie: response }, function () {
          //  Data's been saved boys and girls, go on home
        });
        chrome.storage.local.get(
          /* String or Array */ ["cookie"],
          function (items) {

          }
        );
        console.log("hoi");
        if (response.isAuthenticated === true) {
          props.handleLoginState(true);
          props.handleEmailState(email);
        }
        props.setTags(response.tags);
      })
      .catch(() => {
        M.toast({
          html:
            "User not found, please enter the correct username and password in order to login!",
          displayLength: 1650,
        });
      });
  }

  return (
    <div className="container extension-bg">
      <h3 className="login-title">LaterLezer</h3>
      <div className="row input-form">
        <input
          type="text"
          placeholder="username/email"
          className="input"
          onChange={(e) => setEmail(e.target.value)}
          value={props.username}
        />
        <input
          type="password"
          placeholder="password"
          className="input"
          onChange={(e) => setPassword(e.target.value)}
          value={props.password}
        />
        <button
          value="Log in"
          className="waves-effect waves-light btn"
          onClick={() => {
            handleLoginUser(email, password);
          }}
        >
          Log in
        </button>
      </div>
    </div>
  );
}
