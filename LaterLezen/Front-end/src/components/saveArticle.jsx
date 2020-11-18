import React, { useState, useEffect } from 'react';
import { getArticle, getAllArticles, getArticleByUser } from '../serverCommunication'
import parse from 'html-react-parser';

export default function SaveArticle(props) {
    const [userID, setUserID] = useState(props.userid)
    const [url, setUrl] = useState('');
    const [article, setArticle] = useState('')
    const [hideToggle, setHideToggle] = useState(false);
    const [tags, setTags] = useState('');

    function handleGetArticle(url, tags) {
        if (new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(url)) {
            getArticle(url, tags, userID)
                .then(result => result.json())
                .then(result => {
                    setHideToggle(true)
                    setArticle(result.content)
                })
        } else {
            M.toast({ html: 'Geen geldige URL' })
        }
    }

    return <div className="readArticle">
        <div className="container">
            <h1>LaterLezen</h1>
            <input type="text" placeholder="URL..." onChange={(e) => setUrl(e.target.value)} value={url} />
            <input type="text" placeholder="Tags..." onChange={(e) => setTags(e.target.value)} value={tags} />
            <button className="waves-effect waves-light btn-small blue" onClick={() => { handleGetArticle(url, tags) }}>Save article</button>
            <div class=" flow-text">
                {parse(article)}
            </div>
        </div>
    </div>
}