import React, { useState, useEffect } from "react";
import TagList from "./TagsList";
import { saveArticle } from "../serverCommunication";
export default function Article(props) {
  const [url, setUrl] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([props.tags]);

  useEffect(() => {
    setFilteredTags([...props.tags])
  }, [props.tags]);

  useEffect(() => {
    let filtered = props.tags.filter((name) => name.includes(filter));
    setFilteredTags(filtered);
  }, [filter]);

  function handleUrlChange(e) {
    e.preventDefault();
    setUrl(e.target.value);
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
  }

  function handleSaveArticle(url, tags) {
    saveArticle(url, tags)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        M.toast({ html: "Article successfully saved" });
      });
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
        </div>
        <br />
        <h5>Available tags: </h5>
        <TagList
          handleTagSelect={handleTagSelect}
          tags={filteredTags}
          selectedTags={selectedTags}
        ></TagList>
        <button className="waves-effect waves-light btn" onClick={() => { handleSaveArticle(url, selectedTags) }}>
          Save
        </button>
      </div>
    </div>
  );
}
