import React, { useState } from 'react';
import axios from 'axios';

import banner from './../img/wallpaper.jpg';

function useInput({ type }) {
    const [value, setValue] = useState("");
    const input = <input type={type} onChange={e => setValue(e.target.value)} />
    return [value, input];
}

export default function Register(props) {
    const [email, setEmail] = useInput({ type: "email" });
    const [username, setUsername] = useInput({ type: "text" });
    const [password, setPassword] = useInput({ type: "password" });
    const [confirmPassword, setConfirmPassword] = useInput({ type: "password" });

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(!email == "" || !username == "" || !password == "" || !confirmPassword == "") {
            if (password == confirmPassword) {
                console.log(email, username, password, confirmPassword)
                // TODO: fetch request to server for registration
                axios({
                    url: 'http://localhost:4000/auth/register',
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: {
                        email: email,
                        username: username,
                        password: password
                    }
                })
                .then(response => console.log(response))
                .catch(error => console.error('Something went wrong while registering'))
            } else {
                alert("Password is not matching")
            }
        } else {
            alert("One or more input fields are empty");
        }


    }

    return (
        <div id="register" className="container center-align">
            <div className="title">
                <h1>Laterlezer</h1>
            </div>
            <div className="banner">
                {/* <img src={banner} className="responsive-img banner-img" /> */}
            </div>
            <div className="row form">
                <form onSubmit={onSubmitForm}>
                    <div className="row">
                        <div className="input-field col s6">
                            <p>Email</p>
                            {setEmail}
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <p>Username</p>
                            {setUsername}
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <p>Password</p>
                            {setPassword}
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <p>Confirm password</p>
                            {setConfirmPassword}
                        </div>
                    </div>
                    <div className="row">
                        <input className="btn blue darken-2" type="submit" name="register" value="Register" />
                    </div>
                </form>
            </div>
        </div>
    );

}
