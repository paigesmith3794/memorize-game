
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import fish from "./fish.json";
import "./App.css";

class App extends Component {
  state = {
    fish,
    clickedFish: [],
    score: 0
  };

  imageClick = event => {
    const currentFish = event.target.alt;
    const FishAlreadyClicked =
      this.state.clickedFish.indexOf(currentFish) > -1;

    if (FishAlreadyClicked) {
      this.setState({
        fish: this.state.fish.sort(function (a, b) {
          return 0.5 - Math.random();
        }),
        clickedFish: [],
        score: 0
      });
      alert("You lose. Play again?");

    } else {
      this.setState(
        {
          fish: this.state.fish.sort(function (a, b) {
            return 0.5 - Math.random();
          }),
          clickedFish: this.state.clickedFish.concat(
            currentFish
          ),
          score: this.state.score + 1
        },

        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              fish: this.state.fish.sort(function (a, b) {
                return 0.5 - Math.random();
              }),
              clickedFish: [],
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
          {this.state.fish.map(fish => (
            <FriendCard
              imageClick={this.imageClick}
              id={fish.id}
              key={fish.id}
              image={fish.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;