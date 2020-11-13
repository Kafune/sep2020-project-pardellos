import React, { useState, useEffect } from 'react'
const axios = require('axios');
export default function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    function handleLogin () {
        // fetch('http://localhost:4000/login')
        props.setLoggedIn(true);
    }

    function handleGoogleLogin () {
    //     try {
    //         axios.get('http://localhost:4000/auth/google').then(() => {

    //         })
    //     }
    //    catch (err){
    //     console.log('test')
    //    }
    }

    function handleUsernameChange (e) {
        console.log(username)
        setUsername(e.target.value)
    }

    function handlePasswordChange (e) {
        setPassword(e.target.value)
    }

  return (
    <div>
      <h1>LaterLezer</h1>
      <h5>Username</h5>
      <input
        type="text"
        id="username"
        placeholder="Please enter your username here.."
        value={username}
        onChange={(e) => handleUsernameChange(e)}
      ></input>
      <h5>Password</h5>
      <input
        type="password"
        id="username"
        onChange={(e) => handlePasswordChange(e)}
        value={password}
        placeholder="Please enter your password here.."
      ></input>
      <br></br>
      <a onClick={handleLogin} class="btn indigo darken-1">
        Log in
      </a>
      <h5>No account? Register here!</h5>
      <a onClick={handleGoogleLogin} class="btn indigo darken-1">
        <i class="fab fa-google left"></i>Log in with Google
      </a>
    </div>
  );
}
