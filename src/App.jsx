import React, {Component} from 'react';
import {connect} from 'react-redux';
import Beers from './component/beers';
import './App.css';


class App extends Component {
  render(){
    console.log(this.props.name)
    return (
      <div className="App">
        <Beers/>
      </div>
    );
  }
}

export default connect(state => state.app)(App);
