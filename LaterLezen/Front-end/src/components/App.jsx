import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import SaveArticle from "./saveArticle";
import SearchArticle from "./searchArticle";
import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";
import DisplayArticle from "./displayArticle";
import EditArticle from "./editArticle";
import "../../src/App.css";
import M from "materialize-css";
import background from "../img/pfp_background.jpg";
import pfp from "../img/default_pfp.png";

import {
  checkAuthenticated,
  getArticleByUser,
  getWebSocket,
  openWebSocket,
} from "../serverCommunication";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      logged_in: false,
      articles: [],
      tags: [],
      theme: "default",
    };
  }

  componentDidMount() {
    M.AutoInit();
    checkAuthenticated()
      .then((response) => response.json())
      .then((response) => {
        if (response.isAuthenticated === true) {
          this.handleEmailState(response.user.email);
          this.handleFirstnameState(response.user.firstname);
          this.handleLastnameState(response.user.lastname);
          this.handleTagsState(response.user.tags);
          this.onOpenSocket(response.user.email);
          this.handleLoginState(true);
        }
      })
      .catch((e) => {
        M.toast({ html: "Unauthorized user, please login first" });
      });
  }

  onOpenSocket(email) {
    let ws = openWebSocket();
    ws.onerror = function error() {
      console.log("websocket error");
    };
    ws.onopen = function open() {
      console.log("Websocket connection has been established");
      console.log(email);
      let data = {
        email: email,
        request: "webappUserAdd",
      };
      ws.send(JSON.stringify(data));
    };
    ws.onclose = function close() {};
    ws.onmessage = (msg) =>  {
      switch (msg.data) {
        case "connected":
          console.log(msg.data);
          break;
        case "refresh article data":
          window.location.reload();
      }
    };
  }

  handleLoginState(value) {
    this.setState(() => ({
      logged_in: value,
    }));
  }

  handleEmailState(value) {
    this.setState(() => ({
      email: value,
    }));
  }

  handleFirstnameState(value) {
    this.setState(() => ({
      firstname: value,
    }));
  }

  handleLastnameState(value) {
    this.setState(() => ({
      lastname: value,
    }));
  }

  handleTagsState(value) {
    this.setState(() => ({
      tags: value,
    }));
  }

  render() {
    const setLoginStatus = (c) => this.handleLoginState(c);
    const setEmailState = (c) => this.handleEmailState(c);
    const setFirstnameState = (c) => this.handleFirstnameState(c);
    const setLastnameState = (c) => this.handleLastnameState(c);
    const setTagsState = (c) => this.handleTagsState(c);

    return (
      <div className="App">
        <nav>
          <div class="nav-wrapper blue accent-2">
            <div class="container">
              <a class="brand-logo center">LaterLezen</a>
            </div>
            {this.state.logged_in ? (
              <a
                data-target="slide-out"
                class="sidenav-trigger show-on-large "
                id="hamburger"
              >
                <i class="material-icons">menu</i>
              </a>
            ) : (
              <ul class="right hide-on-med-and-down">
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="register">Register</Link>
                </li>
              </ul>
            )}
          </div>
        </nav>

        <ul id="slide-out" class="sidenav sidenav-close">
          <li>
            <div class="user-view">
              <div class="background">
                <img src={background} />
              </div>
              <a>
                <img class="circle" src={pfp} />
              </a>
              <a>
                <span class="white-text name">
                  {this.state.firstname} {this.state.lastname}
                </span>
              </a>
              <a>
                <span class="white-text email">{this.state.email}</span>
              </a>
            </div>
          </li>
          <Link to="/dashboard">
            <li>
              <a>
                <i class="material-icons" id="dashboard">
                  dashboard
                </i>
                Dashboard
              </a>
            </li>
          </Link>
          <Link to="/save/web">
            <li>
              <a>
                <i class="material-icons" id="saveArticle">
                  article
                </i>
                Save Web Article
              </a>
            </li>
          </Link>
          <Link to="/search">
            <li>
              <a>
                <i class="material-icons" id="search">
                  search
                </i>
                Search Article
              </a>
            </li>
          </Link>
          {/* <Link to="/tags">
            <li>
              <a>
                <i class="material-icons" id="tags">
                  label
                </i>
                Manage tags
              </a>
            </li>
          </Link> */}
          <div class="inner-content">
            <li>
              <a>
                <i class="material-icons" id="settings">
                  settings
                </i>
                Settings
              </a>
            </li>
            <Link to="/logout">
              <li>
                <a>
                  <i class="material-icons" id="logout">
                    exit_to_app
                  </i>
                  Logout
                </a>
              </li>
            </Link>
          </div>
        </ul>
        <div class="container">
          <Switch>
            <Route path="/dashboard">
              <Dashboard
                email={this.state.email}
                firstname={this.state.firstname}
                lastname={this.state.lastname}
                articles={this.state.articles}
              />
            </Route>
            <Route path="/save/web">
              <SaveArticle />
            </Route>
            <Route path="/search">
              <SearchArticle
                tags={this.state.tags}
                articles={this.state.articles}
              />
            </Route>
            <Route path="/login">
              <Login
                handleLoginState={setLoginStatus}
                handleEmailState={setEmailState}
                handleFirstnameState={setFirstnameState}
                handleLastnameState={setLastnameState}
                handleTagsState={setTagsState}
              />
            </Route>
            <Route path="/register">
              <Register
                handleLoginState={setLoginStatus}
                handleEmailState={setEmailState}
                handleFirstnameState={setFirstnameState}
                handleLastnameState={setLastnameState}
                handleTagsState={setTagsState}
              />
            </Route>
            <Route path="/logout">
              <Logout handleLoginState={setLoginStatus} />
            </Route>
            <Route path="/article/:id">
              <DisplayArticle articleID={this.state.article_id} />
            </Route>
            <Route path="/edit/:id">
              <EditArticle />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}
