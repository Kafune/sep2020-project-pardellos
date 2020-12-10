import React, { useState, useEffect } from "react";

import {
  searchArticleByID,
  confirmArticleChanges,
} from "../serverCommunication";
import { useHistory } from "react-router-dom";

import M from "materialize-css";

export default function EditArticle(props) {
  const [article, setArticle] = useState({});
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState([]);

  const history = useHistory();

  useEffect(() => {
    handleTagChips();
  }, []);

  function handleTagChips() {
    var elems = document.querySelectorAll(".chips");
    var instances = M.Chips.init(elems, {
      onChipAdd: (elems) => {
        setTags(elems[0].M_Chips.chipsData);
      },
      onChipDelete: () => {
        setTags(elems[0].M_Chips.chipsData);
      },
      placeholder: "Enter new Tag...",
      secondaryPlaceholder: "+ Sub Tag...",
    });
  }

  useEffect(() => {
    var url = window.location.href;
    var id = url.substring(url.lastIndexOf("/") + 1);
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
          setTags(response.tags);
          setAuthor(response.author);

          let textArea = document.querySelector(".materialize-textarea");
          M.textareaAutoResize(textArea);
        }
      });
  }, []);

  const saveChanges = () => {
    let noErrors = true;
    if (tags !== undefined) {
      var tagArray = [];
      tags.forEach((element) => {
        if (new RegExp("^[a-zA-Z0-9_.-]{1,15}$").test(element.tag)) {
          tagArray.push(element.tag);
        } else {
          M.toast({ html: "Geen geldige tag: " + element.tag });
          noErrors = false;
        }
      });
      if (noErrors === true) {
        confirmArticleChanges(
          article._id,
          title,
          source,
          description,
          author,
          tagArray
        )
          .then(() => {
            M.toast({ html: "Article succesfully saved" });
            history.push("/dashboard");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      M.toast({ html: "Please enter atleast one tag" });
    }
  };

  function cancelChanges(e) {
    console.log("cancel");
    history.push("/dashboard");
  }

  return (
    <div id="edit-article">
      <img src={article.lead_image_url} />
      <label>Title</label>
      <input
        type="text"
        value={title}
        id="title"
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <label>Source</label>
      <input
        type="text"
        id="source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      ></input>
      <label>Description</label>
      <textarea
        type="text"
        id="description"
        class="materialize-textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label>Author</label>
      <input
        type="text"
        id="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      ></input>
      <div
        class="chips chips-placeholder chips-autocomplete tooltipped"
        id="lollig"
        data-position="bottom"
        data-tooltip="[Tag requirements] Allow chars: A-Z / 0-9 / _  / - / Max length: 15 chars"
      ></div>

      {/* {tags.map((elem) => {
        return <span 
        key={elem}
        className="tag">{elem}</span>;
      })} */}
      <button
        className="btn"
        id="confirmChanges"
        onClick={(e) => saveChanges(e)}
      >
        Confirm changes
      </button>
      <button
        className="btn"
        id="cancelChanges"
        onClick={(e) => cancelChanges(e)}
      >
        Cancel changes
      </button>
    </div>
  );
}
