import React from 'react';
import { Link, Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import SaveArticle from './saveArticle'
import SaveArticlePdf from './saveArticlePdf'
import SearchArticle from './searchArticle'
import Login from './Login'
import Register from './Register'
import Logout from './Logout'

import '../../src/App.css'

import background from '../img/pfp_background.jpg'
import pfp from '../img/default_pfp.png'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: 'Mohammed',
      lastname: 'Hulscher',
      email: '',
      logged_in: false,
      articles: []
    }
  }
  handleLoginState(value) {
    this.setState(() => ({
      logged_in: value
    })
    )
  }

  handleEmailState(value) {
    this.setState(() => ({
      email: value
    })
    )
  }

  render() {
    // Materialize Initialization - Side Navbar
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems, {});
    });

    // Materialize Initialization - Action Buttons
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.fixed-action-btn');
      var instances = M.FloatingActionButton.init(elems, {
        hoverEnabled: false
      });
    });

    const setLoginStatus = (c) => this.handleLoginState(c)
    const setEmailState = (c) => this.handleEmailState(c)
    return (
      <div className="App">
        <nav>
          <div class="nav-wrapper blue accent-2">
            <div class="container">
              <Link to="/dashboard"><a class="brand-logo center">LaterLezen</a></Link>
            </div>
            {this.state.logged_in
              ? <a data-target="slide-out" class="sidenav-trigger show-on-large "><i class="material-icons">menu</i></a>
              : <ul class="right hide-on-med-and-down">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="register">Register</Link></li>
              </ul>}
          </div>
        </nav>

        <ul id="slide-out" class="sidenav sidenav-close">
          <li>
            <div class="user-view">
              <div class="background">
                <img src={background} />
              </div>
              <a><img class="circle" src={pfp} /></a>
              <a><span class="white-text name">{this.state.username}</span></a>
              <a><span class="white-text email">{this.state.email}</span></a>
            </div>
          </li>
          <Link to="/dashboard">
            <li>
              <a><i class="material-icons">home</i>Dashboard</a>
            </li>
          </Link>
          <Link to="/save/web">
            <li>
              <a><i class="material-icons">web</i>Save Web Article</a>
            </li>
          </Link>
          <Link to="/save/pdf">
            <li>
              <a><i class="material-icons">picture_as_pdf</i>Save PDF Article</a>
            </li>
          </Link>
          <Link to="/search">
            <li>
              <a><i class="material-icons">search</i>Search Article</a>
            </li>
          </Link>
          <div class="inner-content">
            <li>
              <a><i class="material-icons">settings</i>Settings</a>
            </li>
            <Link to="/logout">
              <li>
                <a><i class="material-icons">exit_to_app</i>Logout</a>
              </li>
            </Link>
          </div>
        </ul>

        <div class="fixed-action-btn">
          <a class="btn-floating btn-large blue accent-2">
            <i class="large material-icons">menu</i>
          </a>
          <ul>
            <li>
              <Link to="/login">
                <a class="btn-floating black">
                  <i class="material-icons">person</i>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <a class="btn-floating black">
                  <i class="material-icons">perm_identity</i>
                </a>
              </Link>
            </li>
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
        <div class="container">
          <Switch>
            <Route path="/dashboard">
              <Dashboard email={this.state.email} firstname={this.state.firstname} lastname={this.state.lastname} articles={this.state.articles} />
            </Route>
            <Route path="/save/web">
              <SaveArticle />
            </Route>
            <Route path="/save/pdf">
              <SaveArticlePdf/>
            </Route>
            <Route path="/search">
              <SearchArticle/>
            </Route>
            <Route path="/login">
              <Login email={this.state.email} handleLoginState={setLoginStatus} handleEmailState={setEmailState} />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/logout">
              <Logout handleLoginState={setLoginStatus} />
            </Route>
          </Switch>
        </div>
      </div >
    );
  }
}