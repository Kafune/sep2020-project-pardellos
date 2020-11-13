import React from 'react';
import Register from './components/Register';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <div className="App">
        <Register/>
      </div>
    );
  }
}
