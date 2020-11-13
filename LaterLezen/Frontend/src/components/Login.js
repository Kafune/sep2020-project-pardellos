import React from "react";
const axios = require('axios');
export default function Login(props) {

    function handleLogin () {
        // fetch('http://localhost:4000/login')
        // console.log(props.loggedIn)
        props.setLoggedIn(true);
    }

    function handleGoogleLogin () {
    //     try {
    //         axios.get('http://localhost:4000/auth/google').then(() => {
    //             console.log('login succesfull')
    //         })
    //     }
    //    catch (err){
    //     console.log('test')
    //    }
    }


  return (
    <div>
      <h1>LaterLezer</h1>
      <h5>Username</h5>
      <input
        type="text"
        id="username"
        placeholder="Please enter your username here.."
      ></input>
      <h5>Password</h5>
      <input
        type="text"
        id="username"
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
