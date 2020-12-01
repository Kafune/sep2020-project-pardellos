import React, { useState, useEffect } from "react";

export default function TagList(props) {
  return (
    <div>
      {props.tags.map((element) => {
        console.log(element)
        return (
          <span key={element} className={"tag " + (props.selectedTags.includes(element)
            ? "selected-tag"
            : "retrieved-tag")
          } onClick={() => props.handleTagSelect(element)}>
            {element}
          </span>
        );
      })}
    </div>
  );
}
