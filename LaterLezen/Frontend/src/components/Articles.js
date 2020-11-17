import React, { useEffect } from 'react'
import Article_item from './Article_item';
import axios from 'axios';

import banner from './../img/wallpaper.jpg';


export default function Articles(props) {
    useEffect(() => {
        // Fetch alle artikelen hierin
        console.log(props.appState.userid)

        axios({
            url: 'http://localhost:4000/articles/user/' + props.appState.userid ,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        // getArticles();
        .then(response => props.setArticles(response.data))
    }, props.appState.articles.length)


    return (
        <div>
            {/* voor elke artikel loopen, voor nu hard-coded */}
            <div id="articles" className="container">
                {console.log(props.appState.articles)}
                {props.appState.articles.map(article => {
                    return <Article_item key={article._id} image={article.image} title={article.title} description={article.description} />
                })}
            </div>
        </div>
    )
}