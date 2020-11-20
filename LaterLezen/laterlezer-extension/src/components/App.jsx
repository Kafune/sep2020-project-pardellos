import React from "react";
import Login from "./Login";
import Article from "./Article";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: '',
      password: ''
    };
  }

  setUsername (value) {
      this.setState(() => ({
          username: value
      }))
  }

  setPassword (value) {
      this.setState(() => ({
          password: value
      }))
  }

  setLogin(value) {
    this.setState(() => ({
      isLoggedIn: value,
    }));
  }

  render() {
    console.log(this.state.isLoggedIn)
    const setIsLoggedIn = (c) => this.setLogin(c);
    const setPass = (c) => this.setPassword(c);
    const setUser = (c) => this.setUsername(c);
    return (
        <div>
            {this.state.isLoggedIn === true
            ? <Article username={this.state.username} password={this.state.password}></Article>
            : <Login setLogin={setIsLoggedIn} setPass={setPass} setUser={setUser} username={this.state.username} password={this.state.password}></Login>
            }
        </div>
    )
  }
}
