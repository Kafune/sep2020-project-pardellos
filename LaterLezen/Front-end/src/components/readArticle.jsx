import React, { useState } from 'react';
import { getArticle, getAllArticles, getArticleByUser } from '../serverCommunication'
import parse from 'html-react-parser';

export default function ReadArticle(props) {
  const [userID, setUserID] = useState(props.userid)
  const [url, setUrl] = useState('');
  const [article, setArticle] = useState('')
  const [articles, setArticles] = useState([]);
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

  function handleGetArticles() {
    getArticleByUser(userID)
      .then(result => result.json())
      .then(result => {
        setHideToggle(false)
        setArticles(result)
      })
  }

  return <div className="readArticle">
    <div className="container">
      <h1>LaterLezen</h1>
      <input type="text" placeholder="URL..." onChange={(e) => setUrl(e.target.value)} value={url} />
      <input type="text" placeholder="tags..." onChange={(e) => setTags(e.target.value)} value={tags} />
      <button className="waves-effect waves-light btn-small" onClick={() => { handleGetArticle(url, tags) }}>Search article</button>
      <button className="waves-effect waves-light btn-small" onClick={() => { handleGetArticles() }}>Get all articles</button><td/>
    {hideToggle
      ? <div class="container flow-text">
        {parse(article)}
      </div>
      : <div class="row">
        {articles.map((data) => {
          return <div key={data._id}>
            <div class="card blue-grey darken-1">
              <div class="card-image">
                <img src={data.image} />
                <span class="card-title">{data.title}</span>
              </div>
              <div class="card-content white-text">
                <p>{data.description}</p>
              </div>
              <div class="card-action">
                <a href={data.url}>See article</a>
              </div>
            </div>
          </div>
        })}
      </div>
    }
  </div>
  </div>
}