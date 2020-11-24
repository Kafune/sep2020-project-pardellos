import React, { useState, useEffect } from "react";
import TagList from "./TagsList";
import {saveArticle} from '../serverCommunication'
export default function Article(props) {
  const [url, setUrl] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);

  const data = [
    {
      title: "hoihoasfasdf",
    },
    {
      title: "test123123",
    },
    {
      title: "kachung is baas",
    },
  ];

  function handleUrlChange(e) {
    e.preventDefault();
    setUrl(e.target.value);
    console.log(url);
  }

  function handleFilterChange(e) {
    e.preventDefault();
    setFilter(e.target.value);
    console.log(filter);
  }

  function handleTagSelect(value) {
    if (selectedTags.includes(value)) {
      setSelectedTags((oldArray) =>
        oldArray.filter((currentValues) => currentValues !== value)
      );
    } else {
      setSelectedTags((oldArray) => [...oldArray, value]);
    }
    console.log(selectedTags);
  }

  function saveArticles() {
    saveArticle(url,selectedTags)
    .then((res) => res.json())
    .then((response) => {
      console.log(response)
    })
  }

  return (
    <div className="container extension-bg">
      <h3 className="login-title">LaterLezer</h3>
      <h4 className="login-title">Add articles here!!</h4>
      <div className="row input-form">
        <input
          type="text"
          placeholder="url"
          className="input"
          onChange={(e) => handleUrlChange(e)}
          value={url}
        ></input>
        <br></br>
        <div>
          <input
            type="text"
            placeholder="find tag.."
            className="input"
            onChange={(e) => handleFilterChange(e)}
            value={filter}
          ></input>
          <button className="waves-effect waves-light btn">Search</button>
        </div>
        <br />
        {/* {selectedTags.map(element => {
          return <span key={element} className="tag selected-tag">{element}</span>
        })} */}
        <h5>Available tags: </h5>
        <TagList
          handleTagSelect={handleTagSelect}
          tags={data}
          selectedTags={selectedTags}
        ></TagList>
        <button className="waves-effect waves-light btn" onClick={saveArticles}>
          Save
        </button>
      </div>
    </div>
  );
}
