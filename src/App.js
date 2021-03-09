import "./styles.css";
import React from "react";
import CardDisplay from "./components/CardDisplay";
import shuffle from "./utils/shuffle";

let cards = [
  { value: "A", actualState: false },
  { value: "A", actualState: false },
  { value: "B", actualState: false },
  { value: "B", actualState: false },
  { value: "C", actualState: false },
  { value: "C", actualState: false },
  { value: "D", actualState: false },
  { value: "D", actualState: false },
  { value: "E", actualState: false },
  { value: "E", actualState: false }
];

class App extends React.Component {
  constructor(props) {
    super(props);

    let cards_in_random_order = shuffle(cards);
    this.state = {
      all_cards: cards_in_random_order,
      visible_cards_index: []
    };
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleCardClick(card_index) {
    // flip the card
    this.state.all_cards[card_index]["actualState"] = true;
    this.setState(this.state);
    // add the face-exposed card to all the face-exposed cards
    this.state.visible_cards_index.push(card_index);
    // if the 2 cards matched:
    if (this.state.visible_cards_index.length > 1) {
      // ie: ==2
      if (
        this.state.all_cards[this.state.visible_cards_index[0]].value ===
        this.state.all_cards[this.state.visible_cards_index[1]].value
      ) {
        // Remove old index array
        while (this.state.visible_cards_index.length > 0) {
          this.state.visible_cards_index.pop();
        }
      } else {
        //flip the card. face-down:
        setTimeout(() => {
          console.log("Cards are differents");

          this.state.all_cards[this.state.visible_cards_index[0]][
            "actualState"
          ] = false;
          this.state.all_cards[this.state.visible_cards_index[1]][
            "actualState"
          ] = false;
          // Remove old index array
          while (this.state.visible_cards_index.length > 0) {
            this.state.visible_cards_index.pop();
          }
          this.setState(this.state);
        }, 500);
      }
    }
  }

  render() {
    return (
      <div class="page" style={{ display: "flex", width: "100%" }}>
        <header>
          <h1 class="animate__animated animate__bounce">Memory Game</h1>
        </header>
        <div id="cardSection">
          {/*Render all the cards */}
          {this.state.all_cards.map((element, index) => (
            <CardDisplay
              key={index}
              value={element["value"]}
              actualState={element["actualState"]}
              handleClick={() => this.handleCardClick(index)}
            />
          ))}
        </div>

        <section>
          <h2>Description</h2>
          <p>
            Projet personnel responsive codé en <strong>React</strong> - mars
            2021
            <br />
            Par Alban Le Dinh
          </p>
        </section>

        <footer>
          <p>
            Lien{" "}
            <a
              href="https://github.com/LEDINHAlban?tab=repositories"
              title="N'hésitez pas à cliquer!"
            >
              Github
            </a>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
