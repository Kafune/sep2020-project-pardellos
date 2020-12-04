import React, { useState, useEffect } from "react";

import { searchArticleByID } from "../serverCommunication";
import { useHistory } from "react-router-dom";

import M from "materialize-css";

export default function EditArticle(props) {
  const [article, setArticle] = useState({});
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([])

  const history = useHistory();

  useEffect(() => {
    var url = window.location.href;
    var id = url.substring(url.lastIndexOf("/") + 1);
    searchArticleByID(id)
      .then((response) => response.json())
      .then((response) => {
        if (response.error === true) {
          history.push("/search");
          M.toast({ html: "Cannot find article" });
        } else {
          setArticle(response);
          setTitle(response.title)
          setDescription(response.description)
          setSource(response.source)
          setTags(response.tags)
        }
      });
  }, []);

  

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
      <input value={source} onChange={(e) => setSource(e.target.value)}></input>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      {console.log(article.tags)}

      {tags.map((elem) => {
        return <span className="tag">{elem}</span>;
      })}
      <button className="btn">Confirm changes</button>
      <button className="btn">Cancel changes</button>
    </div>
  );
}
