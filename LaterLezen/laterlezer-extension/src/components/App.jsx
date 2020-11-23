import React from 'react'

export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          test: "This is a test application"
      }
    }
    render(){
        return(
            <div>
                <h1>{this.state.test}</h1>
            </div>
        )
    }
}