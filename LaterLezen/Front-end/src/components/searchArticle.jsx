import React, { useState, useEffect } from "react";
import {
  searchArticleByTags,
  getAuthors,
  findAuthor,
} from "../serverCommunication";
import { Link } from "react-router-dom";
import M from "materialize-css";


export default function SearchArticle(props) {
  const [tags, setTags] = useState(props.tags);
  const [isChecked, setIsChecked] = useState("");
  const [articles, setArticles] = useState(props.articles);
  const [author, setAuthor] = useState();
  const [showSearch, setShowSearch] = useState(0);

  useEffect(() => {
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

  const handleSearchByAuthor = () => {
    findAuthor(author)
      .then((result) => result.json())
      .then((response) => setArticles(response))
  };

  const getAllAuthors = () => {
    getAuthors()
      .then((response) => response.json())
      .then((result) => result.filter((values) => values.author != ""))
      .then((result) => populateAutocomplete(result))
      .then((result) => {
        var elems = document.querySelector(".autocomplete");
        let options = {
          data: result,
          onAutocomplete: (value) => {
            setAuthor(value);
          },
        };
        M.Autocomplete.init(elems, options);
      })
  };

  const populateAutocomplete = (result) => {
    let authors = {};

    result.forEach((element) => {
      authors[element.author] = null;
    });

    return authors;
  };

  const handleSearchState = (state) => {
    setShowSearch(state)
    if(state == 2) {
      getAllAuthors()
    }
  }

  return (
    <div>
      <h2>Search in all articles</h2>
      <div className="row">
        <div className="col">
      <button className="btn btn blue" onClick={() => handleSearchState(1)}>Search by tags</button>
      </div>
      <div className="col">
      <button className="btn btn blue" onClick={() => handleSearchState(2)}>Search by author</button>
      </div>
      </div>
      {(() => {
        switch (showSearch) {
          case 0:
            return (
           null
            );
          case 1:
            return (
              <React.Fragment>
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
            </React.Fragment>
            );
          case 2:
            return (
              <React.Fragment>
                <div className="row">
                  <h3>Search by author</h3>
                  <div class="s8 search input-field">
                    <input
                      class="autocomplete"
                      type="text"
                      id="autocomplete-input"
                      placeholder="Search"
                      onChange={(e) => setAuthor(e.target.value)}
                      value={author}
                    />
                  </div>
                </div>
                <button
                      className="waves-effect waves-light btn-small blue accent-2"
                      onClick={() => handleSearchByAuthor()}
                    >
                      Search
                    </button>
              </React.Fragment>
            );
          default:
            return null;
        }
      })()}
       <div class="row">
        {articles.map((data) => {
          return  (
          <div key={data._id}>
            <div class="card blue-grey darken-1 dashboard-article">
              <Link to={`/article/${data._id}`}>
                <div class="card-image">
                  <img src={data.image} />
                </div>
              </Link>
              <div class="card-content white-text">
                <Link to={`/article/${data._id}`}>
                  <span class="card-title">{data.title}</span>
                </Link>
                <p>{data.description}</p>
                <span class="author">Author: {data.author}</span>
                <span class="source">Source: {data.source}</span><br/>
               Tags: {data.tags.map((data) => {
                  return  <span class="tag">{data}</span>
                })}
              </div>
              <div class="card-action">
                <Link to={`/article/${data._id}`}>

                  <a id="seeArticle" class="btn green">Read article</a>
                </Link>
                <Link to={`/editArticle/${data._id}`}>
                  <a id="editArticle" class="btn blue">Edit article</a>
                </Link>
              </div>
            </div>
          </div>
          );
        })}
      </div>
    </div>

     
  );
}
