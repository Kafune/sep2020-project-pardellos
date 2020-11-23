import { Dropdown } from 'materialize-css';
import React, { useEffect, useState } from 'react';
import M from 'materialize-css'

export default function Preferences(props) {
    const [fontSize, setFontSize] = useState("small");
    const [currentNumber, setCurrentNumber] = useState(1);

    function changeFontSize(direction) {

        if(direction === "up") {
            if(currentNumber >= 5) {
                M.toast({ html: 'Tekstgrootte kan niet hoger' })
            }
            else{
                setCurrentNumber(currentNumber+1)
            }
            console.log(currentNumber)
       
        }
        else if(direction === "down"){
            if(!currentNumber-1 === -1) {
                setCurrentNumber(currentNumber-1)
                console.log(currentNumber)
            }
            else{
                M.toast({ html: 'Tekstgrootte kan niet lager' })
            }
        }

       switch(currentNumber) {
           case 0:
               setFontSize("x-small")
            //    props.handleFontState("x-small")
               break;
           case 1:
                setFontSize("small")
            //    props.handleFontState("small")
               break;
           case 2:
            setFontSize("medium")
            //    props.handleFontState("medium")
               break;
           case 3:
            setFontSize("large")
            //    props.handleFontState("large")
               break;
           case 4:
            setFontSize("x-large")
            //    props.handleFontState("x-large")
               break;
       }

    }

    function changeBackground(value) {
        props.handleBackgroundState(value)
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
                    <p>Font</p>
                    <div class="input-field col s12">
                    <select>
                        <option value="" disabled selected>Choose a font</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                        </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                <div className="col s12">
                    <p>Background</p>
                        <div className="btn waves round-icon white" onClick={() => changeBackground("white")}></div>
                        <div className="btn waves round-icon yellow" onClick={() => changeBackground("yellow")}></div>
                        <div className="btn waves round-icon black" onClick={() => changeBackground("black")}></div>
                    </div>
                </div>
                <div className="row">
                <div className="col s12">
                    <p>Font size</p>
                    <i className="small material-icons" onClick={() => changeFontSize("up")}>add</i>
                    <i className="small material-icons" onClick={() => changeFontSize("down")}>indeterminate_check_box</i>
                    </div>
                </div>
            </div>
            <br></br><br></br> <br></br><br></br> <br></br><br></br> <br></br><br></br> <br></br><br></br> <br></br><br></br>
            <div className={'text-' + fontSize}>
                <h1>Hallo</h1>
                <p>Dit is een voorbeeld tekst</p>
            </div>
    </div>
}
