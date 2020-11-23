import React, { useState, useEffect } from "react";
import TagList from "./TagsList";
export default function Article(props) {
  const [url, setUrl] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([])

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
    setUrl(e.target.value);
    console.log(url);
  }

  function handleFilterChange(e) {
    e.preventDefault();
    setFilter(e.target.value);
    console.log(filter);
  }

  async function handleTagSelect(value) {
    if (selectedTags.includes(value)) {
      // const index = selectedTags.indexOf(value);
      // if (index > -1) {
      //   selectedTags.splice(index, 1)
      // }
      setSelectedTags(oldArray => oldArray.filter(val => val !== value))
    } else {
      setSelectedTags(oldArray => [...oldArray, value]);
      // selectedTags.push(value)
    }
    console.log(selectedTags);
  }

  function saveArticle() {
    //   const url = `http://localhost:4000/user/${}`
    // fetch()
  }

  return (
    <div>
      <h1>Add articles here!!</h1>
      <input
        type="text"
        placeholder="url"
        className="input"
        onChange={(e) => handleUrlChange(e)}
        value={url}
      ></input>
      <br></br>
      <input
        type="text"
        placeholder="find tag.."
        className="input"
        onChange={(e) => handleFilterChange(e)}
        value={filter}
      ></input>
      <button>Search</button>
      <br/>
      {selectedTags.map(element => {
        return <span key={element} className="tag selected-tag">{element}</span>
      })}
      <TagList handleTagSelect={handleTagSelect} tags={data}></TagList>
      <button onClick={saveArticle}>Save</button>
    </div>
  );
}
