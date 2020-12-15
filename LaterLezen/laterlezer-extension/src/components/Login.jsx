/*global chrome*/
import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { loginUser } from "../serverCommunication";

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLoginUser(email, password) {
    loginUser(email, password)
      .then((response) => response.json())
      .then((response) => {
        if (response.isAuthenticated === true) {
          props.handleEmailState(email);
          props.setTags(response.tags);
          props.handleLoginState(true);
        }
      })
      .catch(() => {
        M.toast({
          html:
            "Incorrect email/password!",
          displayLength: 1650,
        });
      });
  }

  return (
    <div className="container extension-bg">
      <h3 className="login-title">LaterLezer</h3>
      <div className="row">
        <input type="text" placeholder="Email..." onChange={(e) => setEmail(e.target.value)} value={email}/>
        <input type="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)} value={password} />
        <button value="Log in" className="waves-effect waves-light btn" onClick={() => { handleLoginUser(email, password) }}>Log in</button>
      </div>
    </div>
  );
}
