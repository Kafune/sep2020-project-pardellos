import React from 'react';
import { Link, Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import SaveArticle from './saveArticle'
import SaveArticlePdf from './saveArticlePdf'
import SearchArticle from './searchArticle'
import Login from './Login'
import Register from './Register'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: '5fae85cf41f32d3618e3f271',
      articles: []
    }
  }

  handleArticleChange = (data) => {
    this.setState({ ...this.state.articles, articles: data })
  }

  render() {
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.fixed-action-btn');
      var instances = M.FloatingActionButton.init(elems, {
        hoverEnabled: false
      });
    });

    return (
      <div className="container">
        <div class="fixed-action-btn">
          <a class="btn-floating btn-large grey">
            <i class="large material-icons">menu</i>
          </a>
          <ul>
            <li>
              <Link to="/dashboard">
                <a class="btn-floating red">
                  <i class="material-icons">home</i>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/search">
                <a class="btn-floating yellow darken-1">
                  <i class="material-icons">search</i>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/save/pdf">
                <a class="btn-floating green">
                  <i class="material-icons">picture_as_pdf</i>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/save/web">
                <a class="btn-floating blue">
                  <i class="material-icons">web</i>
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route path="/dashboard">
            <Dashboard userid={this.state.userid} articles={this.state.articles} />
          </Route>
          <Route path="/save/web">
            <SaveArticle userid={this.state.userid} />
          </Route>
          <Route path="/save/pdf">
            <SaveArticlePdf userid={this.state.userid} />
          </Route>
          <Route path="/search">
            <SearchArticle userid={this.state.userid} />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </div >
    );
  }
}