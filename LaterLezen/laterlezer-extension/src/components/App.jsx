/*global chrome*/
import React from "react";
import Login from "./Login";
import Article from "./Article";
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      email: "",
      tags: [],
    };
  }

  componentDidMount() {
    M.AutoInit();
  }

  setTags(value) {
    this.setState({
      tags: value,
    });
  }

  handleLoginState(value) {
    this.setState(() => ({
      isLoggedIn: value,
    }));
  }

  handleEmailState(value) {
    this.setState(() => ({
      email: value,
    }));
  }

  render() {
    const currentLoginState = (c) => this.handleLoginState(c);
    const currentEmailState = (c) => this.handleEmailState(c);
    const setTags = (c) => this.setTags(c);

    return (
      <div class="container">
        {this.state.isLoggedIn === true
          ? <Article tags={this.state.tags} email={this.state.email} handleEmailState={currentEmailState} handleLoginState={currentLoginState} />
          : <Login setTags={setTags} handleLoginState={currentLoginState} handleEmailState={currentEmailState} />
        }
      </div>
    );
  }
}
