import React from "react";
import { loginUser } from '../serverCommunication'
export default function Login(props) {
    //   function handleLogin() {
    //     // fetch('http://localhost:4000/login')
    //     console.log(props.loggedIn);
    //     props.setLoggedIn(true);
    //     loginUser('username', 'password');
    //   }

    //   function handleGoogleLogin() {
    //       console.log("Login google")
    //   }

    return (
        <div className="container">
            <h1>LaterLezen</h1>
            <div className="row">
                <div className="col s6">
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
                    <div className="center-align">
                        <a className="waves-effect waves-light btn-small blue">
                            Log in
                        </a>
                        <h6>No account? Register here!</h6>
                        <a className="waves-effect waves-light btn-small blue">
                            <i class="fab fa-google left"></i>Log in with Google
                        </a>
                    </div>
                </div>
                <div className="col s6">
                    <div className="background"></div>
                </div>
            </div>
        </div>
    );
}