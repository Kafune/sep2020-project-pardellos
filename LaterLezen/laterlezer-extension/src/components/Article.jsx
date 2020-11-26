import React, { useState, useEffect } from "react";
import TagList from "./TagsList";
import { saveArticle } from "../serverCommunication";
export default function Article(props) {
  const [url, setUrl] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([props.tags]);

  useEffect(() => {
    console.log(filteredTags)
    setFilteredTags([...props.tags])
  }, [props.tags]);

  function handleUrlChange(e) {
    e.preventDefault();
    setUrl(e.target.value);
    console.log(url);
  }

  function handleFilterChange(e) {
    e.preventDefault();
    setFilter(e.target.value);
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
    console.log(url = "\n" +selectedTags);
    saveArticle(url, selectedTags)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      });
  }

  useEffect(() => {
    let filtered = props.tags.filter((name) => name.includes(filter));
    setFilteredTags(filtered);  
  }, [filter]);

  return (
    <div className="container extension-bg">
      {console.log(props.tags)}
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
        </div>
        <br />
        <h5>Available tags: </h5>
        <TagList
          handleTagSelect={handleTagSelect}
          tags={filteredTags}
          selectedTags={selectedTags}
        ></TagList>
        <button className="waves-effect waves-light btn" onClick={saveArticles}>
          Save
        </button>
      </div>
    </div>
  );
}
