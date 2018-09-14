import { Route, Link } from 'react-router-dom'
import React, { Component } from 'react';
import {Game} from './Game';
import logo from './logo.svg';
import './App.css';

const Home = (props) => {
  return (
    <div className="Home">
      <h2 className="Welcome-text">The Memory Game</h2>
      <PlayButton />
    </div>)
}

const PlayButton = (props) => {
  return (
    <div>
      <Link to='/play'>
        <button className="Play-button">Play</button>
      </Link>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={Home}/>
        <Route path='/play' component={Game}/>
      </div>
    );
  }
}

export default App;
