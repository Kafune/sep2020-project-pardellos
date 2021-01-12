import React, { useState, useEffect } from "react";
import {
  searchArticleByTags,
  findArticle,
} from "../serverCommunication";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

export default function SearchArticle(props) {
  const [tags, setTags] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedTags, setSelectedTags] = useState([])
  const [tagIds, setTagIds] = useState([])
  const [articles, setArticles] = useState(props.articles);
  const [tagCounter, setTagCounter] = useState(0);
  const [showSearch, setShowSearch] = useState(0);
  const [tagState, setTagState] = useState(tags);
  const [query, setQuery] = useState("");
  const [searchContent, setSearchContent] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!props.appState.logged_in) {
      history.push('/login')
    }
    setTags(props.tags);
    setTagState(props.tags);
  }, [props.tags]);

  function printTree(treeNode, indent = "") {
    let tempArray = [];
    treeNode.subTags.forEach((element) => {
      tempArray.push(element);
    });

    setTagState(tempArray);
  }

  function handleSelectTag(index, event) {
    printTree(tagState[index]);
    handleCheckBox(event);
    setIsChecked(false);
  }

  function handleSearchArticleByTag() {
    searchArticleByTags(tagIds)
      .then((response) => {
        setArticles(response.articles);
      });
  }

  function handleClearTags() {
    setIsChecked('');
    setSelectedTags([])
    setArticles([])
    setTagIds([])
    printTree(tags)
  }

  const handleCheckBox = (e) => {
    setIsChecked({ ...isChecked, [e.target.id]: true });
    selectedTags.push(e.target.name)
    tagIds.push(e.target.id)
    setTagCounter(tagCounter + 1)
  };

  const escapeRegExp = (string) => {
    return string.replace(/[.*+\-?^${​​}​​()|[\]\\]/g, "\\$&");
  };

  const handleSearch = () => {
    const sanitizedSearch = escapeRegExp(query);
    findArticle(sanitizedSearch, searchContent)
      .then(result => {
        if (result.length <= 0) {
          M.toast({ html: "No article found!" })
        } else {
          setArticles(result)
        }
      });
  };

  const handleSearchState = (state) => {
    printTree(tags);
    handleClearTags();
    setShowSearch(state);
  };

  return (
    <div>
      <h2 class="center">Search Article</h2>
      <div className="row">
        <button className="btn btn blue" onClick={() => handleSearchState(1)}>
          Search by tags
        </button>
        <div className="col">
          <button className="btn btn blue" id="metaData" onClick={() => handleSearchState(2)}>
            Search by metadata
          </button>
        </div>
      </div>
      {(() => {
        switch (showSearch) {
          case 0:
            return null;
          case 1:
            return (
              <div>
                <div class="row">
                  <h3>Select your tag(s)</h3>
                  {tagState.map((element, i) => {
                    return (
                      <div>
                        <p>
                          <label>
                            <input
                              name={element.tagName}
                              type="checkbox"
                              onClick={(e) => handleSelectTag(i, e)}
                              id={element._id}
                              checked={isChecked}
                            />
                            <span>{element.tagName}</span>
                          </label>
                        </p>
                      </div>
                    );
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
                <h3>Selected tag(s):</h3>
                {selectedTags.map((element) => {
                  return <li>{element}</li>;
                })}
              </div>
            );
          case 2:
            return (
              <div>
                <div className="row">
                  <h3>Search article</h3>
                  <div class="s8 search input-field">
                    <input
                      type="text"
                      id="searchArticle"
                      placeholder="Search"
                      onChange={(e) => setQuery(e.target.value)}
                      value={query}
                    />
                  </div>
                  <label>
                    <input
                      type="checkbox"
                      id="contentSearch"
                      onClick={() => setSearchContent(!searchContent)}
                    />
                    <span>Include search by content</span>
                  </label>
                </div>
                <button
                  className="waves-effect waves-light btn-small blue accent-2"
                  id="searchButton"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            );
          default:
            return null;
        }
      })()}
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
                  <p>
                    Tags:{" "}
                    {data.tags.map((element, i) => {
                      return <li key={i}>{element + " "}</li>;
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
