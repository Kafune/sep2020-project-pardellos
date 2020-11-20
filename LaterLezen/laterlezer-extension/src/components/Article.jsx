import React, { useState, useEffect } from "react";
import TagList from "./TagsList";
export default function Article(props) {
  const [url, setUrl] = useState("");
  const [filter, setFilter] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // fetch(`http://localhost:4000/${props.email}/user/`).then((res) => {
    //   let receivedData = res;
    //   let dataArray = [];

    //   receivedData.forEach((element) => {
    //     dataArray.push({ ...element });
    //   });

    //   setTags(dataArray);
    // });
  });

  function handleUrlChange(e) {
    e.preventDefault();
    setUrl(e.target.value)
    console.log(url)
  }

  function handleFilterChange (e) {
      e.preventDefault();
      setFilter(e.target.value)
      console.log(filter)
  }

  function saveArticle () {
    //   const url = `http://localhost:4000/user/${}`
    // fetch()
  }

  
  return (
    <div>
      <h1>Add articles here!!</h1>
      <input
        type="text"
        placeholder="url"
        onChange={(e) => handleUrlChange(e)}
        value={url}
      ></input>
      <br></br>
      <input type="text" placeholder="find tag.." onChange={(e) => handleFilterChange(e)} value={filter}></input>
      <button>Search</button>
      <br></br>
      <TagList tags={tags}></TagList>
      <button onClick={saveArticle}>Save</button>
    </div>
  );
}
