import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import mariokart from "./mariokart.json";
import "./App.css";

class App extends Component {
  state = {
    mariokart,
    clickedmariokart: [],
    score: 0
  };

  imageClick = event => {
    const currentMariokart = event.target.alt;
    const MariokartAlreadyClicked =
      this.state.clicked.indexOf(currentMariokart) > -1;

    if (MariokartAlreadyClicked) {
      this.setState({
        mariokart: this.state.mariokart.sort(function (a, b) {
          return 0.5 - Math.random();
        }),
        clickedmariokart: [],
        score: 0
      });
      alert("You lose. Play again?");

    } else {
      this.setState(
        {
          mariokart: this.state.mariokart.sort(function (a, b) {
            return 0.5 - Math.random();
          }),
          clickedmariokart: this.state.clickedmariokart.concat(
            currentmariokart
          ),
          score: this.state.score + 1
        },

        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              mariokart: this.state.mariokart.sort(function (a, b) {
                return 0.5 - Math.random();
              }),
              clickedmariokart: [],
              score: 0
            });
          }
        }
      );
    }
  };

  render() {
    return (
      <div>
        <Navbar
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.mariokart.map(mariokart => (
            <FriendCard
              imageClick={this.imageClick}
              id={mariokart.id}
              key={mariokart.id}
              image={mariokart.image}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default App;