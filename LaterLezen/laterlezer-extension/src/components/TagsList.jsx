import React, { useState, useEffect } from "react";

export default function TagList(props) {
  
  return (
    <div>
        {props.tags.map((element) => {
          return <span key={element.title} className="tag retrieved-tag" onClick={() => props.handleTagSelect(element.title)}>
            {element.title}
          </span>
        })}
    </div>
  );
}
