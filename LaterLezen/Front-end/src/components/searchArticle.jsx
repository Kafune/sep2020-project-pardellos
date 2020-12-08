import React, { useState, useEffect } from "react";
import { searchArticleByTags,getAuthors } from "../serverCommunication";
import { Link } from "react-router-dom";
import M from 'materialize-css'

export default function SearchArticle(props) {
  const [tags, setTags] = useState(props.tags);
  const [isChecked, setIsChecked] = useState("");
  const [articles, setArticles] = useState(props.articles);
  const [author, setAuthor] = useState()
  const [suggestion, setSuggestion] = useState()
  // var instance = M.Autocomplete.getInstance(elem);

  useEffect(() => {
    getAllAuthors()

    setTags(props.tags);
  }, [props.tags]);

  function handleSearchArticleByTag() {
    let selectedTags = [];

    Object.keys(isChecked).map((key) => {
      if (isChecked[key] === true) {
        selectedTags.push(key);
      }
    });
    searchArticleByTags(selectedTags)
      .then((response) => response.json())
      .then((response) => {
        setArticles(response.articles);
      });
  }

  const handleCheckBox = (e) => {
    let isSelected = e.target.checked;

    if (isSelected) {
      setIsChecked({ ...isChecked, [e.target.name]: true });
    } else {
      setIsChecked({ ...isChecked, [e.target.name]: false });
    }
  };

  const handleSearchArticleByAuthor = (e) => {
    setAuthor(e.target.value)
  };

  const handleSearch = () => {

  }

  const getAllAuthors = () => {
    getAuthors().then((response) => response.json())
    .then(result => result.filter((values) => values.author != ''))
    .then(result => populateAutocomplete(result))
    .then(result => console.log(result))
    .then((result)=> {
      console.log(suggestion)
      var elems = document.querySelector('.autocomplete');
      let options ={
        data: {"result": null}
      }
      M.Autocomplete.init(elems,options);
    })
}



const populateAutocomplete = (result) => {
  const itemList = result.map((data) => ({[data.author]: null }));
  return itemList
}

  return (
    <div>
      <h2 class="center">Search Article</h2>
      <div class="row">
        <h3>Select your tag(s)</h3>
        {tags.map((data) => {
          return (
            <div class="col" key={data}>
              <p>
                <label>
                  <input
                    type="checkbox"
                    name={data}
                    checked={isChecked[data]}
                    onClick={handleCheckBox}
                  />
                  <span>{data}</span>
                </label>
              </p>
            </div>
          );
        })}
      </div>
      <button
        className="waves-effect waves-light btn-small blue accent-2"
        onClick={() => {
          handleSearchArticleByTag();
        }}
      >
        Search
      </button>
      <div className="row">
        <h3>Search by author</h3>
      <div class="col s8 search input-field"> 
    <input class="autocomplete" type="text" id="autocomplete-input" placeholder="Search" />
    <button
        className="waves-effect waves-light btn-small blue accent-2"
        onClick={() => handleSearch()}
      >
        Search
      </button>
</div>
      </div>
      <div class="row">
        {articles.map((data) => {
          return (
            <div class="col" key={data._id}>
              <div class="card blue-grey darken-1">
                <div class="card-image">
                  <img src={data.image} />
                  <span class="card-title">{data.title}</span>
                </div>
                <div class="card-content white-text">
                  <p>{data.description}</p>
                </div>
                <div class="card-action">
                  <Link to={`/article/${data._id}`}>
                    <a>See article</a>
                  </Link>
                  <p>
                    Tags:{" "}
                    {data.tags.map((data) => {
                      return data + " ";
                    })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
