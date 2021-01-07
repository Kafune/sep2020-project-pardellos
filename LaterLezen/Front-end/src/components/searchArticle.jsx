import React, { useState, useEffect } from "react";
import { searchArticleByTags, getAuthors, findAuthor } from "../serverCommunication";
import { Link } from "react-router-dom";
import M from "materialize-css";

export default function SearchArticle(props) {
  const [tags, setTags] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedTags, setSelectedTags] = useState([])
  const [articles, setArticles] = useState(props.articles);
  const [tagCounter, setTagCounter] = useState(0);
  const [author, setAuthor] = useState('')
  const [showSearch, setShowSearch] = useState(0)
  const [tagState, setTagState] = useState(tags)

  useEffect(() => {
    setTags(props.tags)
    setTagState(props.tags)
    console.log(props.tags)
  }, [props.tags])

  function printTree(treeNode, indent = "") {
    let tempArray = []
      treeNode.subTags.forEach(element => {
        tempArray.push(element)
      });

    setTagState(tempArray)
  }

  function handleSelectTag(index, event) {
    printTree(tagState[index])
    handleCheckBox(event)
    setIsChecked(false)
  }

  function handleSearchArticleByTag() {
    searchArticleByTags(selectedTags)
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        setArticles(response.articles);
      });
  }

  function handleClearTags() {
    setIsChecked('');
    setSelectedTags([])
    setArticles([])
    printTree(tags)
  }

  const handleCheckBox = (e) => {
      setIsChecked({ ...isChecked, [e.target.id]: true });
      selectedTags.push(e.target.name)
      setTagCounter(tagCounter + 1)
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
    printTree(tags)
    handleClearTags()
    setShowSearch(state)
    if (state == 2) {
      getAllAuthors()
    }
  }
  
  return (
    <div>
      <h2 class="center">Search Article</h2>
      <div className="row">
        <button className="btn btn blue" onClick={() => handleSearchState(1)}>Search by tags</button>
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
              <div>
                <div class="row">
                  <h3>Select your tag(s)</h3>
                  {tagState.map((element, i) => {
                    return <div>
                      <p>
                        <label>
                          <input name={element.tagName} type="checkbox" onClick={(e) => handleSelectTag(i, e)}
                            id={element._id}
                            checked={isChecked}
                          />
                          <span>{element.tagName}</span>
                        </label>
                      </p>
                    </div>
                  })}
                </div>
                <div class="row">
                  <div class="col">
                    <button
                      className="waves-effect waves-light btn-small blue accent-2"
                      onClick={() => {
                        handleSearchArticleByTag();
                      }}
                    >
                      Search
              </button>
                  </div>
                  <button
                    className="waves-effect waves-light btn-small blue accent-2"
                    onClick={() => {
                      handleClearTags();
                    }}
                  >
                    Clear tags
              </button>
                </div>
              </div>
            );
          case 2:
            return (
              <div>
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
              </div>
            );
          default:
            return null;
        }
      })()}
      <h3>Selected tag(s):</h3>
      {selectedTags.map((element) => {
        return <li>{element}</li>
      })}
      <div class="row">
        {articles.map((data) => {
          return (
            <div class="row" key={data._id}>
              <div class="card blue-grey darken-1">
                <div class="card-image">
                  <img src={data.lead_image_url} />
                  <span class="card-title">{data.title}</span>
                </div>
                <div class="card-content white-text">
                  <p>{data.excerpt}</p>
                </div>
                <div class="card-action">
                  <Link to={`/article/${data._id}`}>
                    <a id="seeArticle" class="btn green">
                      Read article
                            </a>
                  </Link>
                  <Link to={`/edit/${data._id}`}>
                    <a id="editArticle" class="btn blue">
                      Edit article
                            </a>
                  </Link>
                  <p>
                    Tags:{" "}
                    {data.tags.map((element, i) => {
                      return <li key={i}>{element + " "}</li>
                    })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div >
  );
}
