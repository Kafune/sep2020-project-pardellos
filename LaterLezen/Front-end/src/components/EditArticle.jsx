import React, { useState, useEffect } from "react";

import {
  searchArticleByID,
  confirmArticleChanges,
} from "../serverCommunication";
import { useHistory } from "react-router-dom";

import M from "materialize-css";

export default function EditArticle(props) {
  const [article, setArticle] = useState({});
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState([]);

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
          setTitle(response.title);
          setDescription(response.description);
          setSource(response.source);
          setTags(response.tags);
          setAuthor(response.author);
        }
      });
  }, []);

  function saveChanges(e) {
    confirmArticleChanges(title, source, description, author, tags).then((data) => {
      console.log(data);
    });
  }

  function cancelChanges(e) {
    console.log("cancel");
    history.push("/dashboard");
  }

  return (
    <div>
      <input
        type="text"
        value={title}
        id="title"
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <input
        type="text"
        id="source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      ></input>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <input
        type="text"
        id="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      ></input>

      {tags.map((elem) => {
          
        return <span 
        key={elem}
        className="tag">{elem}</span>;
      })}
      <button className="btn" onClick={(e) => saveChanges(e)}>
        Confirm changes
      </button>
      <button className="btn" onClick={(e) => cancelChanges(e)}>Cancel changes</button>
    </div>
  );
}
