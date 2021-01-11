import React, { useState, useEffect } from "react";
import {
  searchArticleByID,
  deleteArticleByID,
  getPreference,
  savePreference,
  confirmArticleChanges,
} from "../serverCommunication";
import Parser from "html-react-parser/dist/html-react-parser";
import { useHistory, Link } from "react-router-dom";
import Preferences from "./Preferences";
import M from "materialize-css";

export default function DisplayArticle(props) {
  const [article, setArticle] = useState([]);
  const history = useHistory();
  const [background, setBackground] = useState("white");
  const [editFields, setEditFields] = useState();
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTags, setCurrentTags] = useState([]);

  useEffect(() => {
    getArticleContent();
    let dropdown1 = document.querySelector(".dropdown-trigger");
    let dropdownOptions = {
      closeOnClick: false,
      constrainWidth: false,
      onCloseStart: () => {
        handleCancelButton();
      },
    };
    M.Dropdown.init(dropdown1, dropdownOptions);
    getPreferences();
    return () => (document.body.className = "");
  }, []);

  useEffect(() => {
    handleTagChips();
  }, [tags]);

  function handleTagChips() {
    setCurrentTags([]);

    var elems = document.querySelectorAll(".chips");
    var instances = M.Chips.init(elems, {
      onChipAdd: () => {
        setCurrentTags(elems[0].M_Chips.chipsData);
      },
      onChipDelete: () => {
        setCurrentTags(elems[0].M_Chips.chipsData);
      },
      placeholder: "Enter Tag...",
      secondaryPlaceholder: "+ Sub Tag",
    });
  }

  const handleRemoveClick = (index) => {
    const List = [...tags];
    List.splice(index, 1);
    setTags(List);
  };

  function handleAddClick() {
    var tagArray = [];

    currentTags.forEach((element) => {
      tagArray.push(element.tag);
    });
    setTags([...tags, tagArray]);
  }

  const checkTheme = (newTheme) => {
    setBackground(newTheme);
    document.body.className = "theme-" + newTheme;
  };

  const handleSaveButton = () => {
    savePreference(background).then(M.toast({ html: "Theme is saved!" }));
  };
  const handleCancelButton = () => {
    getPreferences();
  };
  const getPreferences = () => {
    getPreference()
      .then((response) => response.json())
      .then((result) => checkTheme(result));
  };

  const showEditField = () => {
    setEditFields(true);
  };

  const saveChanges = () => {
    let title_input = document.querySelector("#title-input");
    if (title_input.value.length <= 0) {
      M.toast({ html: "Required fields can not be empty!" });
    } else {
      let noErrors = true;
      if (tags !== undefined) {
        tags.forEach((data) => {
          data.forEach((element) => {
            if (!new RegExp("^[a-zA-Z0-9_.-]{1,15}$").test(element)) {
              M.toast({ html: "Geen geldige tag: " + element });
              noErrors = false;
            }
          });
        });
      }
      if (noErrors === true) {
        confirmArticleChanges(
          article._id,
          title,
          source,
          description,
          author,
          tags
        )
          .then(() => {
            M.toast({ html: "Article succesfully saved" });
            setEditFields(false);
          })
          .catch(() => {
            M.toast({ html: "Article could not be saved" });
          });
      }
    }
  };

  const cancelChanges = () => {
    getArticleContent();
    setEditFields(false);
  };

  const getArticleContent = () => {
    let url = window.location.href;
    let id = url.substring(url.lastIndexOf("/") + 1);
    searchArticleByID(id)
      .then((response) => response.json())
      .then((response) => {
        if (response.error === true) {
          history.push("/search");
          M.toast({ html: "Cannot find article" });
        } else {
          setArticle(response);
          setTitle(response.title);
          setDescription(response.excerpt);
          setSource(response.domain);
          setAuthor(response.author);
          setTags(response.tags);
          let textArea = document.querySelector(".materialize-textarea");
          M.textareaAutoResize(textArea);
        }
      });
  };

  // function handleDeleteArticle(id) {
  //   deleteArticleByID(id).then((response) => {
  //     if (response.msgError === true) {
  //       M.toast({ html: "Failed to delete article" });
  //     } else {
  //       history.push("/dashboard");
  //       M.toast({ html: "Successfully deleted article" });
  //     }
  //   });
  // }
  return (
    <>
      <Preferences
        handleThemeState={checkTheme}
        backgroundColor={background}
        handleCancelButton={handleCancelButton}
        handleSaveButton={handleSaveButton}
      />
      <div className={"edit-button"}>
        {editFields ? (
          <button class="btn blue" onClick={saveChanges}>
            <i class="small material-icons" id="editArticle">save</i>
          </button>
        ) : (
            <button class="btn blue" onClick={showEditField}>
              <i class="small material-icons" id="editArticle">create</i>
            </button>
          )}
      </div>
      <div className={"cancel-button"}>
        {editFields ? (
          <button class="btn blue" onClick={cancelChanges}>
            <i class="small material-icons" id="cancelEditArticle">cancel</i>
          </button>
        ) : (
            ""
          )}
      </div>

      <div className="article">
        <div className={editFields ? "" : "center"}>
          {editFields ? (
            <React.Fragment>
              <h5>
                Title:
                <div className="input-field">
                  <input
                    required
                    className="validate"
                    id="title-input"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></input>
                </div>
              </h5>
            </React.Fragment>
          ) : (
              <h2 className={"hover-show"}>{title}</h2>
            )}

          <h5 className={"hover-show"}>
            Published by:
            {editFields ? (
              <div className="input-field">
                <input
                  id="author-input"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                ></input>
              </div>
            ) : (
                <b>{" " + author + " "}</b>
              )}
          </h5>
          <h5 className={"hover-show"}>
            Source:
            {editFields ? (
              <div className="input-field">
                <input
                  id="source-input"
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                ></input>
              </div>
            ) : (
                <b>{" " + source + " "}</b>
              )}
          </h5>
          <div className={editFields ? "" : "hidden"}>
            <h5>Description:</h5>
            <textarea
              required
              className="materialize-textarea"
              id={"description-input"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className={editFields ? "col-md-10" : "hidden"}>
            <h5>
              Tags:
              <div
                class=" chips chips-placeholder chips-autocomplete tooltipped"
                data-position="bottom"
                data-tooltip="[Tag requirements] Allow chars: A-Z / 0-9 / _  / - / Max length: 15 chars"
              ></div>
              <button
                className="inline waves-effect waves-light btn-small blue accent-2"
                onClick={() => {
                  handleAddClick();
                }}
              >
                Add
              </button>
            </h5>
            <h5>Used Tags:</h5>
            {tags.map((element, i) => {
              return (
                <p key={i}>
                  <li>
                    {element + " "}
                    <button
                      className="btn-floating btn-small waves-effect waves-light red"
                      onClick={() => {
                        handleRemoveClick(i);
                      }}
                    >
                      <i class="material-icons">delete</i>
                    </button>
                  </li>
                </p>
              );
            })}
          </div>
          <img className="responsive-img" src={article.lead_image_url} />
        </div>
        <div className="text-flow">
          <h5>{Parser(" " + article.content)}</h5>
        </div>
        <a href={article.url} id="originalArticle">
          <button className="waves-effect waves-light btn-small blue accent-2">
            Go to original article
          </button>
        </a>
      </div>
    </>
  );
}
