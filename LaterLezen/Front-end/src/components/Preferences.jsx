import { Dropdown } from 'materialize-css';
import React, { useEffect, useState } from 'react';
import M from 'materialize-css'

export default function Preferences(props) {
    const [activeTheme, setActiveTheme] = useState();

    useEffect(() => {
        setActiveTheme(props.backgroundColor)
    })

    document.addEventListener('DOMContentLoaded', function () {
        var dropdown1 = document.querySelector('.dropdown-trigger');
        var dropdownOptions = {
            'closeOnClick': false,
            'constrainWidth': false,
            'onCloseStart': () => {handleCancelButton()}
        }
        var instanceDropdown = M.Dropdown.init(dropdown1, dropdownOptions);
    });


    function changeTheme(value) {
        props.handleThemeState(value)
        setActiveTheme(value);
    }

    function handleCancelButton() {
        props.handleCancelButton()
    }

    function handleSaveButton() {
        props.handleSaveButton()
    }

    return <div className="row">
        <div className="right-align">
            <a className='dropdown-trigger btn blue' href='#' data-target='dropdown1'><i className="small material-icons">settings</i></a>
        </div>
        <div className={"dropdown-content blue-border theme-"+(props.backgroundColor)} id="dropdown1">
            <div className="row">
                <div className="col s12">
                    <h5>Select a theme to read articles</h5>
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                <div className={'btn-large waves round-icon default' + ('default'=== activeTheme ? " active_theme" : "")} onClick={() => changeTheme("default")}></div>
                    <div className={'btn-large waves round-icon typewriter' + ('typewriter'=== activeTheme ? " active_theme" : "")} onClick={() => changeTheme("typewriter")}></div>
                    <div className={'btn-large waves round-icon dark' + ('dark'=== activeTheme ? " active_theme" : "")}onClick={() => changeTheme("dark")}></div>
                    <div className={'btn-large waves round-icon bluegrey' + ('bluegrey'=== activeTheme ? " active_theme" : "")}onClick={() => changeTheme("bluegrey")}></div>
                    <div className={'btn-large waves round-icon darkblue' + ('darkblue'=== activeTheme ? " active_theme" : "")}onClick={() => changeTheme("darkblue")}></div>

                </div>
            </div>
            <div className="row">
            <div className="col s12">
            <div className="center-align">
                    <div className="btn waves blue accent-2" onClick={handleSaveButton}>Save</div>
                    <div className="btn waves blue accent-2" onClick={handleCancelButton}>Cancel</div>
                </div>
            </div>
            </div>
        </div>
    </div>
}
