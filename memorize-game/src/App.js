import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Container from "../src/components/Container";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import mariokart from "./mariokart.json";
import "./App.css";


class Game extends Component {

  state = {
    mariokart,
    score: 0,
    topScore: 0,
    message: "Click as many images as you can without repeating"
  };

  componentDidMount() {
    this.setState({ mariokart: this.shuffleDeck(this.state.mariokart) });
  }

  shuffleDeck = mariokart => {
    let newMariokart = mariokart.sort(function (a, b) { return 0.5 - Math.random() });
    return newMariokart;
  };

  resetDeck = mariokart => {
    const resetMariokart = mariokart.map(item => ({ ...item, clicked: false }));
    return this.shuffleDeck(resetMariokart);
  };

  correctGuess = newMariokart => {
    let newScore = this.state.score;
    newScore++
    let newTopScore = Math.max(newScore, this.state.topScore);

    this.setState({
      mariokart: this.shuffleDeck(newMariokart),
      score: newScore,
      topScore: newTopScore,
      animation: "animated swing"
    })
  }

  wrongGuess = newMariokart => {
    this.setState({
      mariokart: this.resetDeck(newMariokart),
      score: 0
    })
  }

  gameCardClick = id => {
    let guessedCorrectly = false;

    const newMariokart = this.state.mariokart.map(item => {
      if (item.id === id) {
        if (!item.clicked) {
          item.clicked = true;
          guessedCorrectly = true;
        }
      }
      return item;
    });
    guessedCorrectly ? this.correctGuess(newMariokart) : this.wrongGuess(newMariokart);
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Navbar score={this.state.score} topScore={this.state.topScore} />
        <Jumbotron message={this.state.message} />
        <Container>
          {
            this.state.mariokart.map(item => (
              <div className="animated rollIn">
                <FriendCard
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  animate={!this.state.score && this.state.topScore}
                  clicked={item.clicked}
                  handleClick={this.gameCardClick}
                />
              </div>
            ))
          }
        </Container>
      </div>
    );
  }
}

export default Game;