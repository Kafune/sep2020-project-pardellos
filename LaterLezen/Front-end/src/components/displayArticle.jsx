import React, { useState, useEffect } from "react";
import {
  searchArticleByID,
  deleteArticleByID,
  getPreference,
  savePreference,
  confirmArticleChanges,
} from "../serverCommunication";
import Parser from "html-react-parser/dist/html-react-parser";
import { useHistory } from "react-router-dom";
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
    confirmArticleChanges(article._id, title, source, description, author, tags)
      .then(() => {
        M.toast({ html: "Article succesfully saved" });
        setEditFields(false);
      })
      .catch(() => {
        M.toast({ html: "Article could not be saved" });
      });
  };

  const cancelChanges = () => {
    setTitle(article.title);
    setDescription(article.excerpt);
    setSource(article.domain);
    setAuthor(article.author);
    setEditFields(false);
  };

  useEffect(() => {
    
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
    let url = window.location.href;
    let id = url.substring(url.lastIndexOf("/") + 1);
    searchArticleByID(id)
      .then((response) => response.json())
      .then((response) => {
        if (response.error === true) {
          history.push("/search");
          M.toast({ html: "Cannot find article" });
        } else {
          console.log(response);
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
    return () => (document.body.className = "");
  }, []);

  function handleDeleteArticle(id) {
    deleteArticleByID(id).then((response) => {
      if (response.msgError === true) {
        M.toast({ html: "Failed to delete article" });
      } else {
        history.push("/dashboard");
        M.toast({ html: "Successfully deleted article" });
      }
    });
  }
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
            <i class="small material-icons">save</i>
          </button>
        ) : (
          <button class="btn blue" onClick={showEditField}>
            <i class="small material-icons">create</i>
          </button>
        )}
      </div>
      <div className={"cancel-button"}>
        {editFields ? (
          <button class="btn blue" onClick={cancelChanges}>
            <i class="small material-icons">cancel</i>
          </button>
        ) : (
          ""
        )}
      </div>

      <div className="article">
        <div className="center">
          
            {editFields ? (
              <React.Fragment>
                <h5>Title:
              <div className="input-field inline">
                <input
                  id="author-input"
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
              <div className="input-field inline">
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
              <div className="input-field inline">
                <input
                  id="domain-input"
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                ></input>
              </div>
            ) : (
              <b>{" " + source + " "}</b>
            )}
          </h5>
        <textarea 
          className={editFields ? "materialize-textarea" : "materialize-textarea hidden" } 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          >
          </textarea> 

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
