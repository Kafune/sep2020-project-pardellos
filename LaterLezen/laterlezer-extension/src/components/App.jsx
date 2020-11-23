import React from "react";
import Login from "./Login";
import Article from "./Article";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      email: ''
    };
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

    return (
        <div>
            {this.state.isLoggedIn === true
            ? <Article username={this.state.username}></Article>
            : <Login handleLoginState={handleLoginState} handleEmailState={handleEmailState} email={this.state.email}></Login>
            }
        </div>
    )
  }
}
