import React, { useState, useEffect } from 'react';
import { getArticle, getAllArticles, getArticleByUser } from '../serverCommunication'

export default function Dashboard(props) {
  const [userID, setUserID] = useState(props.userid)
  const [firstname, setFirstname] = useState(props.firstname)
  const [lastname, setLastname] = useState(props.lastname)
  const [url, setUrl] = useState('');
  const [articles, setArticles] = useState(props.articles);
  const [tags, setTags] = useState('');

  useEffect(() => {
    handleGetArticles(userID)
  }, [])

  function handleGetArticles(id) {
    getAllArticles()
      .then(result => result.json())
      .then(result => {
        console.log(result.articles)
        setArticles(result.articles)
      })
  }
  return <div className="readArticle">
      <h2 class="center">All saved articles of {firstname} {lastname}</h2>
      <div class="row">
        {articles.map((data) => {
          return <div key={data._id}>
            <div class="card blue-grey darken-1">
              {/* <div class="card-image">
                <img src={data.image} /> */}
                <span class="card-title">{data.title}</span>
              {/* </div> */}
              <div class="card-content white-text">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil iusto ab libero adipisci ullam eius odio aliquid inventore nisi aut quaerat odit autem obcaecati non delectus cumque, perferendis, numquam ducimus corrupti! Expedita iste libero fuga praesentium velit illo cumque id quia fugit. Dolorum veritatis praesentium necessitatibus nostrum laudantium quod similique.</p>
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