import React from 'react';

export default class ReadArticle extends React.Component {


 
    render() {
      function getHTML() {
        fetch('http://localhost:4000/article', {
          method: 'GET',
          mode: 'cors', 
          credentials: 'include', 
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(result => console.log(result))
    }

    function getContent(data) {
    const test = data.getElementsByTagName("P")[0].innerHTML;
     console.log(test)
    }
    
    return <button onClick={getHTML}>Test</button>
  }
}
