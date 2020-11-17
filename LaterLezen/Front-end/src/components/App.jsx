import React from 'react';
// import Login from './components/Login'
import ReadArticle from './readArticle'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      userid: '5fae85cf41f32d3618e3f271',
      articles: []
    }
  }

  setIsLoggedIn(value) {
    this.setState(() => ({
      loggedIn: value
    })
    )
  }

  handleArticleChange = (data) => {
    this.setState({...this.state.articles, articles: data})
  }

  render() {
    const setLoggedIn = (c) => this.setIsLoggedIn(c);
    const isLoggedIn = this.state.loggedIn;
    return (
      <div>
        <ReadArticle></ReadArticle>
        {/* {isLoggedIn === false
          ? <p></p>
          : <ReadArticle userid={this.state.userid} appState={this.state} setArticles={this.handleArticleChange}/>
        } */}
      </div>
    );
  }
}