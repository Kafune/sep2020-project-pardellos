import React from "react";
import Login from "./Login";
import Article from "./Article";

import './../../src/materialize.css';
import './../../src/App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      email: '',
      tags: []
    };
  }

  SetTags (value) {
    this.setState({
      tags: value
    })
  }

  handleLoginState(value) {
    this.setState(() => ({
      isLoggedIn: value
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

    const handleLoginState = (c) => this.handleLoginState(c);
    const handleEmailState = (c) => this.handleEmailState(c);
    const setTags = (c) => this.SetTags(c);

    return (
        <div>
            {this.state.isLoggedIn === true
            ? <Article tags={this.state.tags} username={this.state.username}></Article>
            : <Login setTags={setTags} handleLoginState={handleLoginState} handleEmailState={handleEmailState} email={this.state.email}></Login>
            }
        </div>
    )
  }
}
