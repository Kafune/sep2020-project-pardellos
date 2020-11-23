import React, {useState, useEffect} from "react";
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
    }

  return (
    <div>
      <input type="text" placeholder="username/email" onChange={(e) => setEmail(e.target.value)} value={props.username}/>
      <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={props.password}/>
      <button value="Log in" onClick={(e) => handleLoginUser(email, password)}>Log in</button>
    </div>
  );
}
