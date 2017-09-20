import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Laps from './Laps';

class App extends Component {
  constructor(){
    super();
    this.state = {
      milliseconds: "00",
      seconds: "00",
      laps: [],
      watchID: null
    }
  }

  startWatch(){
    // This is necessary to stop errors from spamming
    if(!this.state.watchID){
      this.setState((prevState) => {
        // Sets state using watchID so that you can access it later. basically using state as a global variable
        return ({watchID: setInterval(() => {
          this.setState((prevState) => {
            // all the if statements in order to pad the numbers properly
            if(parseInt(prevState.milliseconds) < 9){
              return {milliseconds: "0" + (parseInt(prevState.milliseconds) + 1)}
            } else if (parseInt(prevState.milliseconds) <= 99) {
              return {milliseconds: "" + (parseInt(prevState.milliseconds) + 1)}
            } else {
              if(parseInt(this.state.seconds) < 9){
                return ({
                  milliseconds: "00",
                  seconds: "0" + (parseInt(prevState.seconds) + 1)
                })
              } else {
                return ({
                  milliseconds: "00",
                  seconds: "" + (parseInt(prevState.seconds) + 1)
                })
              }
            }
          })
          // sorry. milliseconds is a misnomer. It's actually every centiseconds
        }, 10)})
      })
    }
  }

  stopWatch(){
    // Clears interval and resets watchID to null
    clearInterval(this.state.watchID);
    this.setState((prevState) => {
      return {watchID: null}
    })
  }

  resetWatch(){
    // clearsInterval to stop, resets watchID, AND all the timing
    clearInterval(this.state.watchID);
    this.setState((prevState) => {
      return {watchID: null, milliseconds: "00", seconds: "00", laps: []}
    })
  }

  lap(){
    // Must be set outside of the setState because prevState changes throughout when the user clicks and when you can get to it in the program
    const milliseconds = this.state.milliseconds;
    const seconds = this.state.seconds;
    const laps = this.state.laps;
    // Must do concat because it returns a new array. this.state IS NOT MUTABLE
    this.setState(() => {
      return ({
        // Resets the state variables but DOES NOT clear interval so the watch keeps going
        laps: laps.concat([{milliseconds: milliseconds, seconds: seconds}]),
        milliseconds: "00",
        seconds: "00",
        watchID: null
      })
    });
    
  }

  render() {
    return (
      <div className="App">
        <div className="watch">
          <h1> Watch! </h1>
          <h2>
            <span className="second">{this.state.seconds}</span>.<span className="milliseconds">{this.state.milliseconds}</span>
          </h2>
          <button id="start" onClick={ (e) => this.startWatch()}>Start</button>
          <button id="stop" onClick={ (e) => this.stopWatch()}>Stop</button>
          <button id="reset" onClick={ (e) => this.resetWatch()}>Reset</button>
          <button id="lap" onClick={ (e) => this.lap()}>Lap</button>
        </div>
        <div className="laps">
          <Laps laps={this.state.laps} />
        </div>
      </div>
    );
  }
}

export default App;
