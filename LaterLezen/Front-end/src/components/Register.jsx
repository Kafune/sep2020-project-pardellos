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
    const [firstName, setfirstName] = useInput({ type: "text" });
    const [lastName, setLastName] = useInput({ type: "text" });
    const [password, setPassword] = useInput({ type: "password" });
    const [confirmPassword, setConfirmPassword] = useInput({ type: "password" });

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (!email == "" || !firstName == "" || lastName == "" || !password == "" || !confirmPassword == "") {
            if (password == confirmPassword) {
                console.log(email, firstName, lastName, password, confirmPassword)
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
                        voornaam: firstName,
                        achternaam: lastName,
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
        <div id="register">
            <div className="title">
                <h1>Laterlezen</h1>
            </div>
            <div className="form">
                <form onSubmit={onSubmitForm}>
                    <div className="row">
                        <div className="input-field col s4">
                            <p>Email</p>
                            {setEmail}
                        </div>
                        <div className="input-field col s4">
                            <p>First Name</p>
                            {setfirstName}
                        </div>
                        <div className="input-field col s4">
                            <p>Last Name</p>
                            {setLastName}
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <p>Password</p>
                            {setPassword}
                        </div>
                        <div className="input-field col s6">
                            <p>Confirm password</p>
                            {setConfirmPassword}
                        </div>
                    </div>
                    <div className="row">
                        <input className="waves-effect waves-light btn-small blue" type="submit" name="register" value="Register" />
                    </div>
                </form>
            </div>
        </div>
    );
}