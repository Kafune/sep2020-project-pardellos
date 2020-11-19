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
            <div className="row">
                <div className="col s6">
                    <h5>Username</h5>
                    <input
                        type="text"
                        id="username"
                        placeholder="Please enter your username here.."
                    ></input>
                </div>
                <div className="col s6">
                    <h5>Password</h5>
                    <input
                        type="text"
                        id="username"
                        placeholder="Please enter your password here.."
                    ></input>
                </div>
                <div class="row">
                    <div className="col">
                        <a className="waves-effect waves-light btn-small blue">
                            Log in
                        </a>
                    </div>
                    <div className="col">
                        <a className="waves-effect waves-light btn-small blue">
                            <i class="fab fa-google left"></i>Log in with Google
                    </a>
                    </div>
                </div>
                <div className="col">
                    <h5>No account?</h5><a className="waves-effect waves-light btn-small blue">
                        Register here!
                    </a>
                </div>
            </div>



            <div className="col s6">
                <div className="background"></div>
            </div>
        </div >
    );
}