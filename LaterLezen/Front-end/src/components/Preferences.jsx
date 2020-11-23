import { Dropdown } from 'materialize-css';
import React, { useEffect } from 'react';

export default function Preferences(props) {
    let currentFontSize;
    let newFontSize = 1;

    function fontSizeUp(direction) {

        if(direction === "up") {
            newFontSize = newFontSize+1;
            console.log(newFontSize)
       
        }
        else if(direction === "down"){
            if(!newFontSize-1 === -1) {
                newFontSize = newFontSize-1;
                console.log(newFontSize)
            }
        }

        if(newFontSize == 0) {
            this.currentFontSize = "x-small"
            // props.handleFontState("x-small");
        }
        if(newFontSize == 1) {
            this.currentFontSize = "small"
            // props.handleFontState("small")
        }
        if(newFontSize == 2) {
            this.currentFontSize = "medium"
            // props.handleFontState("large")
        }
        if(newFontSize == 3) {
            this.currentFontSize = "large"
            // props.handleFontState("x-large")
        }
        // switch(newFontSize) {
        //     case "0":
        //         props.handleFontState("x-small")
        //         break;
        //     case "1":
        //         props.handleFontState("small")
        //         break;
        //     case "2":
        //         props.handleFontState("medium")
        //         break;
        //     case "3":
        //         props.handleFontState("large")
        //         break;
        //     case "4":
        //         props.handleFontState("x-large")
        //         break;
        // }
    }



    return <div className="row">
         <a class='dropdown-trigger btn' href='#' data-target='dropdown1'><i className="small material-icons">settings</i></a>
            <div className="dropdown-content" id="dropdown1">
                <div className="row">
                <div className="col s12">
                    <h5>Preferences for articles</h5>
                </div>
                    </div>
                <div className="row">
                <div className="col s12">
                    <p>Background</p>
                        <div className="btn waves round-icon white"></div>
                        <div className="btn waves round-icon yellow"></div>
                        <div className="btn waves round-icon black"></div>
                    </div>
                </div>
                <div className="row">
                <div className="col s12">
                    <p>Font size</p>
                    <i className="small material-icons" onClick={() => fontSizeUp("up")}>add</i>
                    <i className="small material-icons" onClick={() => fontSizeUp("down")}>indeterminate_check_box</i>
                    </div>
                </div>
            </div>
            <div className={'text-' + currentFontSize}>
                <h1>Hallo</h1>
                <p>Dit is een voorbeeld tekst</p>
            </div>
    </div>
}
