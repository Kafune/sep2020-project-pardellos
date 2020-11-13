// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import ReadArticle from './read_article'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    
  }
  render() {
    return <ReadArticle></ReadArticle>
  }
}
