import React, { useState, useEffect } from "react";
import { findAuthor,getAuthors } from "../serverCommunication";
import M from 'materialize-css'

export default function SearchAuthor(props) {
  const [author, setAuthor] = useState();
  const [articles, setArticles] = useState()

  useEffect(() => {
    getAllAuthors()

  }, []);

  const handleSearchByAuthor = () => {
    findAuthor(author)
      .then((result) => result.json())
      .then((response) => setArticles(response));
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
      });
  };

  const populateAutocomplete = (result) => {
    let authors = {};

    result.forEach((element) => {
      authors[element.author] = null;
    });

    return authors;
  };

  return (<div className="row">
      <h3>Search by author</h3>
      <div class="col s8 search input-field">
        <input
          class="autocomplete"
          type="text"
          id="autocomplete-input"
          placeholder="Search"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button
          className="waves-effect waves-light btn-small blue accent-2"
          onClick={() => handleSearchByAuthor()}
        >
          Search
        </button>
      </div>
    </div>
  );
}
