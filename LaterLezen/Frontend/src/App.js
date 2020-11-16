import React from 'react';
import Login from './components/Login'
import Home from './components/Home'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
    }
  }

  setIsLoggedIn(value) {
    this.setState(() => ({
      loggedIn: value
    })
    )
  }

  render() {
    const setLoggedIn = (c) => this.setIsLoggedIn(c);
    const isLoggedIn = this.state.loggedIn;
    return (
      <div>
      {isLoggedIn === false
        ? <Login setLoggedIn={setLoggedIn} loggedIn={this.state.loggedIn}/> 
        : <Home/>
      }
    </div>
    );
  }
}