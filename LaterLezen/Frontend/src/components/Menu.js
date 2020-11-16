import React, { useState } from 'react';
import axios from 'axios';

function useInput({ type }) {
    const [value, setValue] = useState("");
    const input = <input type={type} onChange={e => setValue(e.target.value)} />
    return [value, input];
}

export default function Menu (props) {
    const [searchInput, setSearchInput] = useInput({type: "text"});

    return (
        <div id="menu">
            <div>
            <p><b>Search articles</b></p>
            {setSearchInput}
            </div>
            <ul id="slide-out" className="side-nav">

            </ul>
        </div>

    )
}