import React, { useState, useEffect } from "react";
import { loginUser } from '../serverCommunication'


export default function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLoginUser(email, password) {
    loginUser(email, password)
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            if (response.isAuthenticated === true) {
                props.handleLoginState(true)
                props.handleEmailState(email)
            }
        })
    props.handleLoginState(true)
  }

  return (
    <div className="container extension-bg">
      <h3 className="login-title">LaterLezer</h3>
      <div className="row input-form">
        <input type="text" placeholder="username/email" className="input" onChange={(e) => setEmail(e.target.value)} value={props.username} />
        <input type="password" placeholder="password" className="input" onChange={(e) => setPassword(e.target.value)} value={props.password} />
        <button value="Log in" className="waves-effect waves-light btn" onClick={() => { handleLoginUser(email, password) }}>Log in</button>
      </div>
    </div>
  );
}
