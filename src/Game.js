import {cardsEasy, cardsMed, cardsHard, shuffle} from './cards';
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {Card} from './Card';

const states = {
  MATCHED: 'matched',
  MISMATCHED: 'mismatched',
  SELECTED: 'selected',
  UNSELECTED: 'unselected'
}

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: 0,
      cards: [],
      cardsMatched: [],
      cardsSelected: []
    }
  }
  componentWillMount = () => {
    let deck = shuffle(cardsHard)
    let cards = deck.map((card, i) => {
      return {
          id:i,
          key:i,
          front:card.cardImage,
          back:card.cardBack,
          rank:card.rank,
          suit:card.suit,
          status:states.UNSELECTED,
          selectCard:this.addCardToSelected,
          isMatch:this.isMatch
        }
    })
    this.setState({cards})
  }
  componentDidUpdate = () => {
    if (this.state.cardsSelected.length == 2)
      if (this.isMatch())
        this.updateMatchedCards()
      else
        this.updateMismatchedCards()
  }

  addToSelected = (id, rank, suit) => {
    let card = this.state.cards.filter((card) => {
      return card.id == id
    })[0]
    let cardsSelected = this.state.cardsSelected
    cardsSelected.push(card)

    let cards = this.state.cards
    card.status = states.SELECTED
    cards.splice(card.id, 1, card)

    this.setState({
      cardsSelected,
      cards
    })
  }
  removeFromSelected = (id, rank, suit) => {
    let card = this.state.cards.filter((card) => {
      return card.id == id
    })[0]

    let cards = this.state.cards
    card.status = states.UNSELECTED
    cards.splice(card.id, 1, card)

    let cardsSelected = this.state.cardsSelected.filter((x) => {
      return card.id !== x.id
    })
    console.log("unselected cards",cardsSelected);
    this.setState({
      cardsSelected,
      cards
    })
  }

  isMatch = () => {
    let cardsSelected = this.state.cardsSelected
    let cardOne = cardsSelected[0]
    let cardTwo = cardsSelected[1]
    if(cardOne.rank === cardTwo.rank){
      return true
    } else {
      return false
    }
  }

  updateMatchedCards = () => {
    let id1 = this.state.cardsSelected[0].id
    let id2 = this.state.cardsSelected[1].id
    let matches = this.state.cards.filter(card => card.id === id1 || card.id === id2)
    matches = matches.map((card) => {
      card.status = states.MATCHED
      return card
    })
    let cards = this.state.cards
    matches.map((card) => {
        cards.splice(card.id,1,card)
    })
    let cardsSelected = []
    let points = this.state.points
    points += 10
    this.setState({cards, cardsSelected, points})
  }

  updateMismatchedCards = () => {
    let cardsSelected = this.state.cardsSelected
    cardsSelected = cardsSelected.map((card) => {
      card.status = states.UNSELECTED
      return card
    })
    let cards = this.state.cards
    cards.map((card) => {
      cards.splice(card.id,1,card)
    })
    cardsSelected = []
    let points = this.state.points
    points -= 2
    setTimeout(function(){
      this.setState({cards, cardsSelected, points})
    }
    .bind(this), 500)
  }

  renderCards = () => {
    return this.state.cards.map((card, i) => {
      return (
        <Card
          id={i}
          key={i}
          front={card.front}
          back={card.back}
          rank={card.rank}
          suit={card.suit}
          status={card.status}
          selectCard={this.addToSelected}
          unSelectCard={this.removeFromSelected}
          isMatch={this.isMatch}
          />)
    })
  }

  render() {
    let cards = this.renderCards()
    return (
      <div className="Board">
        <Link className="Go-home" to="/">The Memory Game</Link>
        <div className="Heading">
          <h2>Match cards of the same rank</h2>
          <h1>{this.state.points}pts</h1>
        </div>
        {cards}
      </div>
    )
  }

}
