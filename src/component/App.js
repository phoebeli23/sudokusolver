import React from 'react';
import './App.css';
import Grid from './Grid';
import KeyboardEventHandler from 'react-keyboard-event-handler';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      inFocus: -1,
      squares: Array(81).fill(null),
      inConflict: new Set(),
    }
  }

  handleClick = (i) => {
    let focus = i;
    if (this.state.inFocus === i) {
      focus = -1;
    }
    this.setState({
      inFocus: focus,
    })
  }

  handleKeyPress = (key, e) => {
    const inConflict = new Set(this.state.inConflict);
    const i = this.state.inFocus;
    const squares = this.state.squares.slice();
    
    if (key === 'backspace') {
      squares[i] = null;
      inConflict.delete(i);
    } else {
      squares[i] = Number(key);
      if (!this.isValid(squares, i)) {
        inConflict.add(i);
      } else {
        inConflict.delete(i)
      }
    }
    this.setState({
        squares: squares,
        inConflict: inConflict,
    })
  }

  handleRandom = () => {
    const difficulty = Math.floor(Math.random() * 3) + 1;
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = 'http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9?level=' + difficulty; // site that doesn’t send Access-Control-*
    fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
      .then(response => response.json())
      .then(json => {
        if (!json.response) {
          throw Error();
        }
        const squares = Array(81).fill(null);
        let i;
        json.squares.forEach(square => {
          i = square.x * 9 + square.y;
          squares[i] = square.value;
        })
        this.setState({
          squares: squares,
      })
      }).catch(() => console.log("Can’t access " + url + " response."));
  }

  handleReset = () => {
    this.setState({
        squares: Array(81).fill(''),
        inConflict: new Set(),
    })
  }

  handleSolve = () => {
    if (this.state.inConflict.size > 0) {
      alert('No solutions found!');
    } else {
      const squares = this.state.squares.slice();
      if (!this.sudokuSolve(squares, 0)) {
        alert('No solutions found!');
        return;
      }
      this.setState({
        inFocus: -1,
        squares: squares,
      });
    }    
  }

  sudokuSolve = (squares, i) => {
    if (i === squares.length) {
      return true;
    }
    if (typeof(squares[i]) === 'number') {
      return this.sudokuSolve(squares, i + 1);
    }
    for (let j = 1; j <= 9; j++){
      squares[i] = j;
      if (this.isValid(squares, i)) {
        if (this.sudokuSolve(squares, i + 1)) {
          return true;
        }
      } 
    }
    squares[i] = null;
    return false;
  }

  isValid = (squares, i) => {
    const input = squares[i];
    const row = Math.floor(i / 9);
    const col = i % 9;

    //check row and col
    for (let j = 0; j < 9; j++) {
      const sameRow = row * 9 + j;
      const sameCol = j * 9 + col;
      if ((sameRow !== i && squares[sameRow] === input)
            || (sameCol !== i && squares[sameCol] === input)){
        return false;
      } 
    }
    //check 3x3 block
    let start = Math.floor(row / 3) * 27 + Math.floor(col / 3) * 3;
    let curr;
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        curr = start + (j * 9 + k);
        if (curr !== i && squares[curr] === input) {
          return false;
        }
      }
    }
    return true;
  }


  render() {
    return (
      <React.Fragment>
        <KeyboardEventHandler
          handleKeys={['1', '2', '3', '4', '5', '6', '7', '8', '9', 'backspace']}
          onKeyEvent={this.handleKeyPress}
          handleFocusableElements={true}
        />
        <div className="App">
          <header className="App-header">
            <h1>Sudoku Solver</h1>
            <p>Fill in the grid with numbers [1-9] and click 'Solve!'</p>
          </header>
          <div className='grid-area'>
            <Grid
              squares={this.state.squares}
              inConflict={this.state.inConflict}
              inFocus={this.state.inFocus}
              handleClick={this.handleClick}
            />
          </div>
          <div className='button-bar'>
            <button id='random-button' onClick={this.handleRandom}>Random</button>
            <button id='reset-button' onClick={this.handleReset}>Reset</button>
            <button id='solve-button' onClick={this.handleSolve}>Solve</button>
          </div>
          <footer>
            <p>Made with React by Phoebe Li (2020)</p>
          </footer>
        </div>
      </React.Fragment>
    );
  }

}

export default App;
