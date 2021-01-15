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
  const [currentTags, setCurrentTags] = useState([]);

  const history = useHistory();

  useEffect(() => {
    handleTagChips()
  }, [tags])

  function handleTagChips() {
    setCurrentTags([]);

    var elems = document.querySelectorAll('.chips');
    var instances = M.Chips.init(elems, {
      onChipAdd: () => {
        setCurrentTags(elems[0].M_Chips.chipsData)
      },
      onChipDelete: () => {
        setCurrentTags(elems[0].M_Chips.chipsData)
      },
      placeholder: 'Enter Tag...',
      secondaryPlaceholder: '+ Sub Tag...',
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
      tags.forEach((data) => {
        data.forEach((element) => {
          if (!new RegExp("^[a-zA-Z0-9_.-]{1,15}$").test(element)) {
            M.toast({ html: 'Geen geldige tag: ' + element })
            noErrors = false
          }
        })
      })
    }
    if (noErrors === true) {
      console.log(tags)
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
          history.push(`/article/${article._id}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    else {
      M.toast({ html: "Please enter atleast one tag" });
    }
  };

  function cancelChanges(e) {
    console.log("cancel");
    history.push("/dashboard");
  }

  const handleRemoveClick = index => {
    const List = [...tags];
    List.splice(index, 1);
    setTags(List);
  };

  function handleAddClick() {
    var tagArray = []

    currentTags.forEach((element) => {
      tagArray.push(element.tag)
    })
    setTags([...tags, tagArray])
  };

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
      <label>Tag</label>
      <div class="chips chips-placeholder chips-autocomplete tooltipped" data-position="bottom" data-tooltip="[Tag requirements] Allow chars: A-Z / 0-9 / _  / - / Max length: 15 chars" ></div><button className="waves-effect waves-light btn-small blue accent-2" onClick={() => { handleAddClick() }}>Add</button>
      <h3>Used Tags:</h3>
      {tags.map((element, i) => {
        return <h4 key={i}>
          <li>{element + " "}
            <button className="btn-floating btn-small waves-effect waves-light red" onClick={() => { handleRemoveClick(i) }}>
              <i class="material-icons">delete</i>
            </button>
          </li>
        </h4>
      })}
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
