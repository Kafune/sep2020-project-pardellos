import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { registerUser } from '../serverCommunication'

import banner from './../img/wallpaper.jpg';

export default function Register(props) {
    const [email, setEmail] = useInput({ type: "email" });
    const [firstName, setfirstName] = useInput({ type: "text" });
    const [lastName, setLastName] = useInput({ type: "text" });
    const [password, setPassword] = useInput({ type: "password" });
    const [confirmPassword, setConfirmPassword] = useInput({ type: "password" });
    const history = useHistory();

    function useInput({ type }) {
        const [value, setValue] = useState("");
        const input = <input type={type} onChange={e => setValue(e.target.value)} required />
        return [value, input];
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            registerUser(email, password, firstName, lastName)
                .then((response) => {
                    if (response.status == 200) {
                        response.json()
                            .then(() => {
                                M.toast({ html: 'Account successfully created' })
                                history.push('/login')
                            })
                    }
                    else {
                        M.toast({ html: 'Email already taken' })
                    }
                })
        } else {
            M.toast({ html: 'Passwords are not matching' })
        }
    }

    return (
        <div id="register">
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