import React, { useState, useEffect } from 'react';
import { getArticle, getAllArticles, getArticleByUser } from '../serverCommunication'
import { Link } from 'react-router-dom'

export default function Dashboard(props) {
  const [firstname, setFirstname] = useState(props.firstname)
  const [lastname, setLastname] = useState(props.lastname)
  const [articles, setArticles] = useState(props.articles);
  const [id, setId] = useState()

  useEffect(() => {
    handleGetArticles()
  }, [])

  useEffect(() => {
    setFirstname(props.firstname)
    setLastname(props.lastname)
  }, [props.firstname][props.lastname])

  function handleGetArticles() {
    getArticleByUser()
      .then(result => result.json())
      .then(result => {
        setArticles(result.articles)
      })
  }


  return <div className="readArticle">
    <h2 class="center">All saved articles of {firstname} {lastname}</h2>
    <div class="row">
      {articles.map((data) => {
        return <div key={data._id}>
          <div class="card blue-grey darken-1 dashboard-article">
            <Link to={`/article/${data._id}`}>
              <div class="card-image">
                <img src={data.image} />
              </div>
            </Link>
            <div class="card-content white-text">
              <Link to={`/article/${data._id}`}>
                <span class="card-title">{data.title}</span>
              </Link>
              <p>{data.description}</p>
              <span class="author">Author: {data.author}</span>
              <span class="source">Source: {data.source}</span><br/>
             Tags: {data.tags.map((data) => {
                return  <span class="tag">{data}</span>
              })}
            </div>
            <div class="card-action">
              <Link to={`/article/${data._id}`}>
               
                <a id="seeArticle" class="btn green">Read article</a>
              </Link>
              <Link to={`/editArticle/${data._id}`}>
                <a id="editArticle" class="btn blue">Edit article</a>
              </Link>
            </div>
          </div>
        </div>
      })}
    </div>
  </div>
}