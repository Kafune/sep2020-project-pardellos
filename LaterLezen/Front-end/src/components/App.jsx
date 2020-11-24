import React  from 'react';
import { Link, Switch, Route  } from 'react-router-dom'
import Dashboard from './Dashboard'
import SaveArticle from './saveArticle'
import SaveArticlePdf from './saveArticlePdf'
import SearchArticle from './searchArticle'
import Login from './Login'
import Register from './Register'
import Logout from './Logout'
import DisplayArticle from './displayArticle'

import '../../src/App.css'
import M from 'materialize-css'
import background from '../img/pfp_background.jpg'
import pfp from '../img/default_pfp.png'

import { checkAuthenticated } from '../serverCommunication'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      logged_in: false,
      articles: [],
      article_id: '',
      tags: []
    }
  }

  componentDidMount() {
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
    
        // Materialize Initialization - Tooltips
        document.addEventListener('DOMContentLoaded', function() {
          var elems = document.querySelectorAll('.tooltipped');
          var instances = M.Tooltip.init(elems, {});
        });

    checkAuthenticated()
      .then((response) => response.json())
      .then((response) => {
        if (response.isAuthenticated === true) {
          this.handleLoginState(true)
          this.handleEmailState(response.user.email)
          this.handleFirstnameState(response.user.firstname)
          this.handleLastnameState(response.user.lastname)
          this.handleTagsState(response.user.tags)
          
        }
      })
      .catch((e) => {
        M.toast({ html: 'Unauthorized user, please login first' })
      });
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

  handleFirstnameState(value) {
    this.setState(() => ({
      firstname: value
    })
    )
  }

  handleLastnameState(value) {
    this.setState(() => ({
      lastname: value
    })
    )
  }

  handleTagsState(value) {
    this.setState(() => ({
      tags: value
    })
    )
  }

  handleIDState(value) {
    this.setState(() => ({
      article_id: value
    })
    )
  }

  render() {
    const setLoginStatus = (c) => this.handleLoginState(c)
    const setEmailState = (c) => this.handleEmailState(c)
    const setFirstnameState = (c) => this.handleFirstnameState(c)
    const setLastnameState = (c) => this.handleLastnameState(c)
    const setTagsState = (c) => this.handleTagsState(c)
    const setIDState = (c) => this.handleIDState(c)
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
              <a><span class="white-text name">{this.state.firstname} {this.state.lastname}</span></a>
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
              <SaveArticlePdf tags={this.state.tags} />
            </Route>
            <Route path="/search">
              <SearchArticle tags={this.state.tags} articles={this.state.articles} handleIDState={setIDState}/>
            </Route>
            <Route path="/login">
              <Login handleLoginState={setLoginStatus} handleEmailState={setEmailState} handleFirstnameState={setFirstnameState} handleLastnameState={setLastnameState} handleTagsState={setTagsState} handleIDState={setIDState} />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/logout">
              <Logout handleLoginState={setLoginStatus} />
            </Route>
            <Route path="/article/:id">
              <DisplayArticle articleID={this.state.article_id}/>
            </Route>
          </Switch>
        </div>
      </div >
    );
  }
}