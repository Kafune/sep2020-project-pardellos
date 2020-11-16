import React from 'react';
import ReadArticle from './readArticle';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  render() {
    return <div className="App">
      <ReadArticle />
    </div>
  }
}
