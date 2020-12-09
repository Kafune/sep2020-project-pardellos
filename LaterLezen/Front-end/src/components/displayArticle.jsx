import React, { useState, useEffect } from 'react';
import { searchArticleByID, deleteArticleByID } from '../serverCommunication'
import Parser from 'html-react-parser/dist/html-react-parser'
import { useHistory } from 'react-router-dom'


export default function DisplayArticle(props) {
    const [article, setArticle] = useState([])

    const history = useHistory();

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
    }, [])

    function handleDeleteArticle(id){
        deleteArticleByID(id)
        .then((response) => {
            if (response.msgError === true) {
                M.toast({ html: 'Failed to delete article' })
            } else {
                history.push('/dashboard')
                M.toast({ html: 'Successfully deleted article' })
            }
        })
    }

    return <div class="row">
        <div class="center">
            <h2>{article.title}</h2>
            <h4> Published by: <b>{article.source} {article.author}</b></h4>
        </div>
        <div class="text-flow">
            <h5>
                <img src={article.lead_image_url} alt="lead"/>
                {Parser(" " + article.content)}
            </h5>
        </div>
        <a href={article.url}><button className="waves-effect waves-light btn-small blue accent-2">Go to original article</button></a>
        <button className="waves-effect waves-light btn-small blue accent-2" onClick={() => { handleDeleteArticle(article._id) }}>Unsave this article</button>
    </div>
}
