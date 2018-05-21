import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import MyForm from './MyForm';

class App extends Component {
  state = {
    fields: {}
  };

  updateFields(fields) {
    this.setState({fields});
  }

  render() {
    return (
      <div className="App">
        <MyForm onChange={fields => this.updateFields(fields)} />
        <p>
          {JSON.stringify(this.state.fields, null, 2)}
        </p>
      </div>
    );
  }
}

export default App;
