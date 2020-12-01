import { Dropdown } from 'materialize-css';
import React, { useEffect, useState } from 'react';
import M from 'materialize-css'

export default function Preferences(props) {

    document.addEventListener('DOMContentLoaded', function () {
        var dropdown1 = document.querySelector('.dropdown-trigger');
        var dropdownOptions = {
            'closeOnClick': false,
            'hover': false,
            'constrainWidth': false
        }
        var instanceDropdown = M.Dropdown.init(dropdown1, dropdownOptions);
    });

    const [currentNumber, setCurrentNumber] = useState(2);
    const [fontSizes] = useState(["x-small", "small", "medium", "large", "x-large"])

    
    useEffect(() => {
        // props.handleBackgroundState
    })

    const addNumber = () => {
        console.log(currentNumber)
        if (currentNumber < 4) {
            setCurrentNumber(currentNumber + 1)
        } else {
            M.toast({ html: 'Tekstgrootte kan niet hoger' })
        }
    }

    const subtractNumber = () => {
        if (!currentNumber <= 0) {
            setCurrentNumber(currentNumber - 1)
        } else {
            M.toast({ html: 'Tekstgrootte kan niet lager' })
        }
    }

    function changeBackground(value) {
        props.handleBackgroundState(value)
    }

    return <div className="row">
        <div className="right-align">
            <a className='dropdown-trigger btn blue' href='#' data-target='dropdown1'><i className="small material-icons">settings</i></a>
        </div>
        <div className={"dropdown-content bg-"+(props.backgroundColor)} id="dropdown1">
            <div className="row">
                <div className="col s12">
                    <h5>Preferences for articles</h5>
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <p>Select a theme</p>
                    <div className="btn waves round-icon white" onClick={() => changeBackground("white")}></div>
                    <div className="btn waves round-icon yellow" onClick={() => changeBackground("yellow")}></div>
                    <div className="btn waves round-icon black" onClick={() => changeBackground("dark")}></div>
                </div>
            </div>
        </div>
    </div>
}
