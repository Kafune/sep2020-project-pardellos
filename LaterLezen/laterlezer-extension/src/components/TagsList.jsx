import React, { useState, useEffect } from "react";

export default function TagList(props) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/${props.email}/user/`)
      .then((result) => result.json)
      .then((response) => console.log(response));
  });
  return <div></div>;
}
