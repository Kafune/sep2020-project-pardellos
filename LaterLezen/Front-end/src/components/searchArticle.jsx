import React, { useState, useEffect } from "react";
import { searchArticleByTags } from "../serverCommunication";
import { Link } from "react-router-dom";

export default function SearchArticle(props) {
  const [tags, setTags] = useState(props.tags);
  const [isChecked, setIsChecked] = useState("");
  const [selectedTags, setSelectedTags] = useState("")
  const [articles, setArticles] = useState(props.articles);
  const [tagCounter, setTagCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(true)
  const [searchMainTag, setSearchMainTag] = useState('')
  const [searchSubTag, setSearchSubTag] = useState('')
  const [mainTagState, setMainTagState] = useState(false)
  const [subTagState, setSubTagState] = useState(false)
  const [lastTagState, setLastTagState] = useState(false)

  useEffect(() => {
    setTags(props.tags)
    if (tags.length >= 1) {
      setIsLoading(false)
    }
  }, [props.tags, tags]);

  useEffect(() => {
    if (tagCounter > 0) {
      setMainTagState(true)
    } else {
      setMainTagState(false)
    }

    if (tagCounter > 1) {
      setSubTagState(true)
    } else {
      setSubTagState(false)
    }

    if (tagCounter > 2) {
      setLastTagState(true)
    } else {
      setLastTagState(false)
    }

  }, [tagCounter])

  function handleSearchArticleByTag() {
    let selectedTagsList = []

    Object.keys(selectedTags).map((key) => {
      if (selectedTags[key] === true) {
        selectedTagsList.push(key);
      }
    });
    console.log(selectedTagsList)
    searchArticleByTags(selectedTagsList)
      .then((response) => response.json())
      .then((response) => {
        setArticles(response.articles);
      });
  }

  function handleClearTags() {
    setTagCounter(0)
    setIsChecked('');
    setSelectedTags('')
    setArticles([])
  }

  const handleCheckBox = (e) => {
    let isSelected = e.target.checked;
    if (isSelected) {
      setIsChecked({ ...isChecked, [e.target.id]: true });
      setSelectedTags({ ...selectedTags, [e.target.name]: true })
      setTagCounter(tagCounter + 1)
    } else {
      setIsChecked({ ...isChecked, [e.target.name]: false });
      setSelectedTags({ ...selectedTags, [e.target.name]: false })
      setTagCounter(tagCounter - 1)
    }
  };

  return (

    <div>
      <h2 class="center">Search Article</h2>
      { isLoading === false
        ? <div>
          <div class="row">
            <h3>Select your tag(s)</h3>
            {tags.map((mainTag) => {
              return (
                <div class="col" key={mainTag._id}>
                  <p>
                    <label>
                      <input
                        type="checkbox"
                        name={mainTag.tagName}
                        id={mainTag._id}
                        checked={isChecked[mainTag._id]}
                        onClick={(e) => {
                          handleCheckBox(e)
                          setSearchMainTag(mainTag.tagName)
                        }}
                        disabled={mainTagState}
                      />
                      <span>{mainTag.tagName}</span>
                    </label>
                  </p>
                </div>
              )
            })}
            {tags.filter((tag) => (tag.tagName.includes(searchMainTag))).map((filteredTags) => {
              return filteredTags.subTags.map((subTag) => {
                return (
                  <div class="col" key={subTag._id}>
                    { tagCounter > 0
                      ? <p>
                        <label>
                          <input
                            type="checkbox"
                            name={subTag.tagName}
                            id={subTag._id}
                            checked={isChecked[subTag._id]}
                            onClick={(e) => {
                              handleCheckBox(e)
                              setSearchSubTag(subTag.tagName)
                            }}
                            disabled={subTagState}
                          />
                          <span>{subTag.tagName}</span>
                        </label>
                      </p>
                      : null}
                  </div>
                )
              })
            })}
            {
              tags.filter((tag) => (tag.tagName.includes(searchMainTag))).map((filteredTags) => {
                return filteredTags.subTags.filter((element) => (element.tagName.includes(searchSubTag))).map((filteredSubTags) => {
                  return filteredSubTags.subTags.map((filteredSubTag) => {
                    return (
                      <div class="col" key={filteredSubTag._id}>
                        { tagCounter > 1
                          ? <p>
                            <label>
                              <input
                                type="checkbox"
                                name={filteredSubTag.tagName}
                                id={filteredSubTag._id}
                                checked={isChecked[filteredSubTag._id]}
                                onClick={handleCheckBox}
                                disabled={lastTagState}
                              />
                              <span>{filteredSubTag.tagName}</span>
                            </label>
                          </p>
                          : null}
                      </div>
                    )
                  })
                })
              })
            }
          </div>
        </div>
        : null
      }
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
      <div class="row">
        {articles.map((data) => {
          return (
            <div class="col" key={data._id}>
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
    </div >
  );
}
