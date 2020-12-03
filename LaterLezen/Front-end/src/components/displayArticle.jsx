import React, { useState, useEffect } from 'react';
import { getPreference, searchArticleByID, savePreference } from '../serverCommunication'
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

    const handleSaveButton = () => {
        savePreference(background);
      }
    const handleCancelButton = () => {
        getPreferences();
    }
    
    const getPreferences = () => {
        getPreference().then((response) => response.json())
        .then(result => checkBackground(result))
    }
    useEffect(() => {
        getPreferences()
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

    return <div className="row">
        <Preferences handleBackgroundState={checkBackground}
        backgroundColor={background}  handleCancelButton={handleCancelButton} handleSaveButton={handleSaveButton}
       ></Preferences>
        <div className="article center">
            <h2>{article.title}</h2>
            <h4> Published by: <b>{article.source} {article.author}</b></h4>
        </div>
        <div className="text-flow">
            <h5>
                <img className="responsive-img" src={article.image} />
                {Parser(" " + article.content)}
            </h5>
        </div>
        <a href={article.url}><button className="waves-effect waves-light btn-small blue accent-2">Go to original article</button></a>
    </div>
}
