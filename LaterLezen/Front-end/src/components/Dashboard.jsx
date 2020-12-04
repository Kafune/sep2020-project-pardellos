import React, { useState, useEffect } from 'react';
import { getArticle, getAllArticles, getArticleByUser } from '../serverCommunication'
import { Link } from 'react-router-dom'

export default function Dashboard(props) {
  const [firstname, setFirstname] = useState(props.firstname)
  const [lastname, setLastname] = useState(props.lastname)
  const [articles, setArticles] = useState(props.articles);

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
          <div class="card blue-grey darken-1">
            <div class="card-image">
              <img src={data.lead_image_url} />
              <span class="card-title">{data.title}</span>
            </div>
            <div class="card-content white-text">
              <p>{data.excerpt}</p>
            </div>
            <div class="card-action">
              <Link to={`/article/${data._id}`}>
                <a>See article</a>
              </Link>
              <p>Tags: {data.tags.map((data) => {
                return data + " "
              })}</p>
            </div>
          </div>
        </div>
      })}
    </div>
  </div>
}