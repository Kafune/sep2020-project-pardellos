
import React from 'react';
const parser = new DOMParser()

class ReadArticle extends React.Component {

  async componentDidMount() {
    this.getHTML();
  }

  getContent(data) {
    const parsedDocument = parser.parseFromString(data, "text/html")
    // const something = parsedDocument.body.textContent;
    console.dir(parsedDocument.body.textContent);
  }

  async getHTML() {
    await fetch('http://localhost:4000/article', )
    .then(result => result.text())
    .then(result => this.getContent(result))
    
}
  render() {

    return <button onClick={this.getHTML}>Test</button>
  }
}
export default ReadArticle;