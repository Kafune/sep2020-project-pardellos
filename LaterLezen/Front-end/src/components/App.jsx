import React from 'react';
// import Login from './components/Login'
import ReadArticle from './readArticle'
import Register from './Register'
import 'materialize-css/dist/css/materialize.min.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
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
        {/* <ReadArticle userid={this.state.userid}></ReadArticle> */}
        {isLoggedIn === false
          ? <Register/>
          : <ReadArticle userid={this.state.userid} appState={this.state} setArticles={this.handleArticleChange}/>
        }
      </div>
    );
  }
}