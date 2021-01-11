import React, { useState, useEffect } from "react";
import {
  getArticle,
  getAllArticles,
  getArticleByUser,
  openWebSocket, getWebSocket
} from "../serverCommunication";
import { Link, Redirect } from "react-router-dom";

export default function Dashboard(props) {
  const [firstname, setFirstname] = useState(props.firstname);
  const [lastname, setLastname] = useState(props.lastname);
  const [articles, setArticles] = useState(props.articles);
  const [id, setId] = useState();

  useEffect(() => {
    handleGetArticles();
  }, []);

  useEffect(() => {
    setFirstname(props.firstname);
    setLastname(props.lastname);
  }, [props.firstname][props.lastname]);

  useEffect(() => {
    let ws = openWebSocket();
    ws.onopen = () => { console.log('connected') };
    ws.onclose = () => { };
    ws.onmessage = msg => (console.log(msg))
    ws.onerror = () => { console.log('Error bij het openen van de websocket') };
  }, []);

  function handleGetArticles() {
    getArticleByUser()
      .then((result) => result.json())
      .then((result) => {
        setArticles(result.articles);
      });
  }
  

  return (
    <div className="readArticle">
      <h2 class="center">
        All saved articles of {firstname} {lastname}
      </h2>
      <div class="row">
        {articles.map((data) => {
          return (
            <div key={data._id}>
              <div class="card blue-grey darken-1 dashboard-article">
                <div class="card-image">
                  <img src={data.lead_image_url} />
                  <span class="card-title">{data.title}</span>
                </div>
                <div class="card-content">
                  <p>{data.excerpt}</p>
                  <span class="author">Author: {data.author}</span>
                  <span class="source">Source: {data.domain}</span>
                  <br />
                  <span>
                    Tags:{" "}
                    {data.tags.map((element, i) => {
                      return <li key={i}>{element + " "}</li>
                    })}
                  </span>
                  <div class="row">
                    <br />
                    <div class="col">
                      <Link to={`/article/${data._id}`}>
                        <a id="seeArticle" class="btn green">
                          Read article
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
