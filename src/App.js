import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PicCard from "./components/PicCard/PicCard.js";
import Wrapper from "./components/Wrapper/Wrapper.js";
import landmarks from "./landmarks.json";

class App extends Component {

  state = {
    landmarks,
    clickedArray:[],
    topScore: 0,
    score: 0,
    message: "",
    shakeit: "false"
  };

  clickPicture = id => {
    const shuffledArray = this.shuffleArray(landmarks);
    this.setState({landmarks: shuffledArray});
    if (this.state.clickedArray.includes(id)) {
      this.setState({ score: 0, clickedArray: [], message: "Wrong! Game Over. Click an image to start again!", shakeit:"true"});
    } else {
      this.setState({
        clickedArray: this.state.clickedArray.concat([id]),
        score: this.state.score +1,
        message: "You Guessed Correctly!",
        shakeit: "false"
      });
    }
    if (this.state.score > this.state.topScore) {
      this.setState({ topScore: this.state.score });
    }
  }
    shuffleArray = (landmarksArray) => {
      for (let i = landmarksArray.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [landmarksArray[i], landmarksArray[j]] = [landmarksArray[j], landmarksArray[i]];
      }
      return landmarksArray;
    }
  render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className = "App-title">Welcome To The Clicky Game Made By React!</h1>
      </header>
      <h3>
        <strong className= "instruction">Click on a different image every time to earn points, game is over when you click on the same image twice!</strong>
        <p className = "score"><strong>Score: {this.state.score} | TopScore: {this.state.topScore}</strong></p>
        <p className = "message"><strong>{this.state.message}</strong></p>
      </h3>
      <Wrapper
      shakeWrapper = {this.state.shakeit}
      pictures = 
      {this.state.landmarks.map(picture => (
        <PicCard
        clickPicture = {this.clickPicture}
        id={picture.id}
        key = {picture.id}
        name = {picture.name}
        image = {picture.image}
        />
      ))}
      />
      <footer className = "footer">
        <div className = "container">
          <span className="text-muted">© Turan Ketene</span>
        </div>
      </footer>
    </div>
  );
  }
}

export default App;
