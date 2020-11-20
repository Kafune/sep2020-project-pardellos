import React from "react";

export default function Login(props) {

    function handleLogin (e) {
        e.preventDefault();
        props.setLogin(true)
    }

  return (
    <div>
      <input type="text" placeholder="username/email" />
      <input type="password" placeholder="password" />
      <button value="Log in" onClick={(e) => handleLogin(e)}>Log in</button>
    </div>
  );
}
