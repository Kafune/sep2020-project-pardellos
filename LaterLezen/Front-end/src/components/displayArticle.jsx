import React, { useState, useEffect } from 'react';
import { searchArticleByID } from '../serverCommunication'
import Parser from 'html-react-parser/dist/html-react-parser'
import { useHistory } from 'react-router-dom'
import Preferences from './Preferences'

export default function DisplayArticle(props) {
    const [article, setArticle] = useState([])

    const history = useHistory();

    const [background, setBackground] = useState('white');

    const checkBackground = (background) => {
        setBackground(background)
        document.body.className = 'theme-' + background;
      }

    useEffect(() => {
        var url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);
        searchArticleByID(id)
            .then((response) => response.json())
            .then((response) => {
                if (response.error === true) {
                    history.push('/search')
                    M.toast({ html: 'Cannot find article' })
                } else {
                    setArticle(response)
                }
            })
            return () => document.body.className = ''
    }, [])

    return <div class="row">
        <Preferences handleBackgroundState={checkBackground}
        backgroundColor={background}
       ></Preferences>
        <div class="center">
            <h2>{article.title}</h2>
            <h4> Published by: <b>{article.source} {article.author}</b></h4>
        </div>
        <div class="text-flow">
            <h5>
                <img src={article.image} />
                {Parser(" " + article.content)}
            </h5>
        </div>
        <a href={article.url}><button className="waves-effect waves-light btn-small blue accent-2">Go to original article</button></a>
    </div>
}
