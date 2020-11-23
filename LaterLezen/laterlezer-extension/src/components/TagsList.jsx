import React, { useState, useEffect } from "react";

export default function TagList(props) {
  
  return (
    <div>
        {props.tags.map((element) => {
          return <span key={element.title} className={"tag " + (props.selectedTags.includes(element.title) ? 'selected-tag' : 'retrieved-tag')} onClick={() => props.handleTagSelect(element.title)}>
            {element.title}
          </span>
        })}
    </div>
  );
}
