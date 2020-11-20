import React from "react";
import Login from "./Login";
import Article from "./Article";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  setLogin(value) {
    this.setState(() => ({
      isLoggedIn: value,
    }));
  }

  render() {
    console.log(this.state.isLoggedIn)
    const setIsLoggedIn = (c) => this.setLogin(c);
    return (
        <div>
            {this.state.isLoggedIn === true
            ? <Article></Article>
            : <Login setLogin={setIsLoggedIn}></Login>
            }
        </div>
    )
  }
}
