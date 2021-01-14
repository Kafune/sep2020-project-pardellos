import React, { useState, useEffect } from "react";

export default function ManageTags(props) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(props.tags);
  }, [props.tags]);

  return (
    <div>
      {tags.map((element) => {
        return (
          <div>
            <p>
              {element}
              <a>
                <i class="material-icons">delete</i>
              </a>
              <a>
                <i class="material-icons">edit</i>
              </a>
            </p>
          </div>
        );
      })}
    </div>
  );
}
