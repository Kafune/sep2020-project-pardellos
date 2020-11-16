import React, { useEffect } from 'react'
import Article_item from './Article_item';
import axios from 'axios';

import banner from './../img/wallpaper.jpg';


export default function Articles(props) {


    useEffect(() => {
        // Fetch alle artikelen hierin
    })

    return (
        <div>
            {/* voor elke artikel loopen */}
            {/* <Article_item image="" title="" description=""/> */}
            <div id="articles" className="container">
                <div class="row">
                    <div class="col s5">
                        <div class="card">
                            <div class="card-image">
                                <img src={banner} />
                            </div>
                            <div class="card-content">
                                <span class="card-title">Artikel titel</span>
                                <p>Artikel text</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}