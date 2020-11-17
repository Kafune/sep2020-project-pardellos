import React, { useState } from 'react';
import { getArticle, getAllArticles } from '../serverCommunication'
import parse from 'html-react-parser';

export default function ReadArticle(props) {
  const [url, setUrl] = useState('');
  const [article, setArticle] = useState('')
  const [articles, setArticles] = useState([]);

  function handleGetArticle(url) {
    if (new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(url)) {
      getArticle(url)
        .then(result => result.json())
        .then(result => setArticle(result.content))
    } else {
      alert('Geen geldige URL')
    }
  }

  function handleGetArticles() {
    getAllArticles()
      .then(result => result.json())
      .then(result => setArticles(result))
  }

  return <div className="readArticle">
    <h1>Read Article</h1>
    <input type="text" placeholder="URL..." onChange={(e) => setUrl(e.target.value)} value={url} />
    <button onClick={() => { handleGetArticle(url) }}>Search article</button>
    <button onClick={() => { handleGetArticles() }}>Get all articles</button>
    <div>
    {parse(article)}
    </div>
    <ul>
      {articles.map((data) => {
        return <li key={data._id}>
          <ul><b>Title:</b> {data.title}</ul>
          <ul><b>Description:</b> {data.description}</ul>
        </li>
      })}
    </ul>
  </div>
}