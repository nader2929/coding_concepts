import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ChessBoard from './ChessBoard';
import DirectionControls from './DirectionControls';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      greeting: '',
      boardConfig: null,
      isLoaded: false
    };

    this.boardRef = React.createRef();
    this.characterRef = React.createRef();
  }

  componentDidMount() {
    this.newBoard();
  }

  directionClick(e){
    this.boardRef.current.directionClick(e);
  }

  newBoard(){
    fetch('/api/game/config?id=1')
      .then(response => response.json())
      .then(response => this.setState({ boardConfig: response, isLoaded: true }));
  }

  refreshLayout(e){
    this.setState( {isLoaded: false} );
    this.newBoard();
  }

  render() {
    let content;
    if (!this.state.isLoaded) {
      content = (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="loading">Loading...</div>
        </header>
      );
    } else {
      var random =  Math.floor(Math.random() * 3)+1;
      var colour="";
      if (random==1){
        colour = "RED";
      }
      else if (random == 2){
        colour="GREEN";
      }
      else{
        colour = "BLUE";
      }
      content = (
        <main className="App-main">
          <div><button onClick={(e) => this.refreshLayout(e)}>New Game</button></div>
          <div class="columnLayout">
            <ChessBoard id="chessBoard" config={this.state.boardConfig} ref={this.boardRef} characterRef={this.characterRef} />
            <DirectionControls characterRef={this.characterRef} />
          </div>
          <div><h1 id="color_to_collect">{colour}</h1></div>
          <div><h1 id="collected"></h1></div>
          
        </main>
      );
    }

    return (
      <div className="App">
        {content}
      </div>
    );
  }

}

export default App;
