import React, { useState, useEffect } from "react";

export default function TagList(props) {
  
  return (
    <div>
        {props.tags.map((element) => {
          return <li key={element.title} onClick={() => props.handleTagSelect(element.title)}>
            {element.title}
          </li>
        })}
    </div>
  );
}
