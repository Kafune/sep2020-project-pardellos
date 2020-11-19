import React, { useState, useEffect } from 'react';
import { getArticle, getAllArticles, getArticleByUser } from '../serverCommunication'

export default function Dashboard(props) {
  const [userID, setUserID] = useState(props.userid)
  const [url, setUrl] = useState('');
  const [articles, setArticles] = useState(props.articles);
  const [tags, setTags] = useState('');

  useEffect(() => {
    handleGetArticles(userID)
  }, [])

  function handleGetArticles(id) {
    getArticleByUser(id)
      .then(result => result.json())
      .then(result => {
        setArticles(result)
      })
  }
  return <div className="readArticle">
      <h1>LaterLezen</h1>
      <h2>All saved articles of {userID}</h2>
      <div class="row">
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
    </div>
}