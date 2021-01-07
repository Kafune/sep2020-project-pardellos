/*global chrome*/
import React, { useState, useEffect } from "react";
import TagList from "./TagsList";
import { saveArticle } from "../serverCommunication";
import M from "materialize-css";
export default function Article(props) {
  const [email, setEmail] = useState(props.email)
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("")
  const [filter, setFilter] = useState("");
  // const [selectedTags, setSelectedTags] = useState([]);
  // const [filteredTags, setFilteredTags] = useState([props.tags]);


  // useEffect(() => {
  //   setFilteredTags([...props.tags])
  // }, [props.tags]);

  // useEffect(() => {
  //   let filtered = props.tags.filter((name) => name.includes(filter));
  //   setFilteredTags(filtered);
  // }, [filter]);

  function handleUrlChange(e) {
    e.preventDefault();
    setUrl(e.target.value);
  }

  function handleFilterChange(e) {
    e.preventDefault();
    setFilter(e.target.value);
  }

  function handleTitleChange(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }


  // function handleTagSelect(value) {
  //   if (selectedTags.includes(value)) {
  //     setSelectedTags((oldArray) =>
  //       oldArray.filter((currentValues) => currentValues !== value)
  //     );
  //   } else {
  //     setSelectedTags((oldArray) => [...oldArray, value]);
  //   }
  // }

  function handleSaveArticle(url, title, email) {
    saveArticle(url, title, email)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        M.toast({ html: "Article successfully saved" });
      });
  }

  function handleLogout() {
    props.handleEmailState("")
    props.handleLoginState(false)
  }

  function handleGetUrl (e) {
    e.preventDefault();
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let url = tabs[0].url;
      setUrl(url);
      console.log(url)
    });
  }

  return (
    <div className="container">
      <h3 className="h1">LaterLezer</h3>
      <h4 className="h2">Add article:</h4>
      <div className="row input-form">
      <input type="text" placeholder="URL.." className="input" onChange={(e) => handleUrlChange(e)} value={url} />
      <button onClick={(e) => handleGetUrl(e)}>get url from active tab</button>
        <input type="text" placeholder="Title.." className="input" onChange={(e) => handleTitleChange(e)} value={title} />
        <input type="text" placeholder="Search Tag(s).." className="input" onChange={(e) => handleFilterChange(e)} value={filter} />
        <div>
        </div>
        <h5>Available tags: </h5>
        {/* <TagList handleTagSelect={handleTagSelect} tags={filteredTags} selectedTags={selectedTags} /> */}
        <button className="waves-effect waves-light btn" onClick={() => { handleSaveArticle(url, title, email) }}>Save</button>
        <button className="waves-effect waves-light btn" onClick={() => { handleLogout() }}>Logout</button>
      </div>
    </div>
  );
}
