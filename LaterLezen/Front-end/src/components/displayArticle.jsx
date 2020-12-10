import React, { useState, useEffect } from "react";
import {
  searchArticleByID,
  deleteArticleByID,
  getPreference,
  savePreference,
} from "../serverCommunication";
import Parser from "html-react-parser/dist/html-react-parser";
import { useHistory } from "react-router-dom";
import Preferences from "./Preferences";
import M from "materialize-css";

export default function DisplayArticle(props) {
  const [article, setArticle] = useState([]);

  const history = useHistory();

  const [background, setBackground] = useState("white");

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
          setArticle(response);
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
      <div className="article">
        <div className="center">
          <h2>{article.title}</h2>
          <h4>
            {" "}
            Published by:{" "}
            <b>
              {article.source} - {article.author}
            </b>
          </h4>
        </div>
        <div className="text-flow">
          <h5>
            <img className="responsive-img" src={article.image} />
            {Parser(" " + article.content)}
          </h5>
        </div>
        <a href={article.url} id="originalArticle">
          <button className="waves-effect waves-light btn-small blue accent-2">
            Go to original article
          </button>
          {/* <button className="waves-effect waves-light btn-small blue accent-2" onClick={() => { handleDeleteArticle(article._id) }}>Unsave this article</button> */}
        </a>
      </div>
    </>
  );
}
