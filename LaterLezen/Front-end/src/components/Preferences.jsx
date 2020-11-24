import { Dropdown } from 'materialize-css';
import React, { useEffect, useState } from 'react';
import M from 'materialize-css'

export default function Preferences(props) {

    document.addEventListener('DOMContentLoaded', function() {
        var dropdown1 = document.querySelector('.dropdown-trigger');
        var dropdownOptions = {
            'closeOnClick': false,
            'hover':true,
            'constrainWidth': false
        }
        var instanceDropdown = M.Dropdown.init(dropdown1, dropdownOptions);
    });

    const [currentNumber, setCurrentNumber] = useState(1);

    function changeFontSize(direction) {
        console.log(direction)
        if(direction === "up") {
            if(currentNumber >= 5) {
                M.toast({ html: 'Tekstgrootte kan niet hoger' })
            }
            else{
                setCurrentNumber(currentNumber+1)
                console.log(currentNumber)
            }
       
        }
        if(direction === "down"){
            if(!currentNumber <= 0) {
                setCurrentNumber(currentNumber-1)
                console.log(currentNumber)
            }
            else{
                M.toast({ html: 'Tekstgrootte kan niet lager' })
            }
        }
       switch(currentNumber) {
           case 0:
               props.handleFontState("x-small")
               break;
           case 1:
               props.handleFontState("small")
               break;
           case 2:
               props.handleFontState("medium")
               break;
           case 3:
               props.handleFontState("large")
               break;
           case 4:
               props.handleFontState("x-large")
               break;
       }

    }

    function changeBackground(value) {
        props.handleBackgroundState(value)
        document.body.style.backgroundColor = value;
    }

    return <div className="row">
        <div className="right-align">
         <a className='dropdown-trigger btn blue' href='#' data-target='dropdown1'><i className="small material-icons">settings</i></a>
         </div> 
            <div className="dropdown-content" id="dropdown1">
                <div className="row">
                <div className="col s12">
                    <h5>Preferences for articles</h5>
                </div>
                    </div>
                <div className="row">
                <div className="col s12">
                    <p>Background</p>
                        <div className="btn waves round-icon white" onClick={() => changeBackground("white")}></div>
                        <div className="btn waves round-icon yellow" onClick={() => changeBackground("#f3f3c2")}></div>
                        <div className="btn waves round-icon black" onClick={() => changeBackground("black")}></div>
                    </div>
                </div>
                <div className="row">
                <div className="col s12">
                    <p>Font size</p>
                    <i className="small material-icons zoom-icon" onClick={() => changeFontSize("up")}>add</i>
                    <i className="small material-icons zoom-icon" onClick={() => changeFontSize("down")}>indeterminate_check_box</i>
                    </div>
                </div>
            </div>
    </div>
}
