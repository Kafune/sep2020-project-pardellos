import React, {useState, useEffect} from "react";

export default function Login(props) {
    function handleLogin (e) {
        e.preventDefault();
        props.setLogin(true)
    }

    function handleUsernameChange (e) {
        e.preventDefault();
        props.setUser(e.target.value)
    } 

    function handlePasswordChange (e) {
        e.preventDefault();
        props.setPass(e.target.value)
    }

  return (
    <div>
      <input type="text" placeholder="username/email" onChange={(e) => handleUsernameChange(e)} value={props.username}/>
      <input type="password" placeholder="password" onChange={(e) => handlePasswordChange(e)} value={props.password}/>
      <button value="Log in" onClick={(e) => handleLogin(e)}>Log in</button>
    </div>
  );
}
