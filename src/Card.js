import {cardsEasy} from './cards';
import React, { Component } from 'react';

const states = {
  MATCHED: 'matched',
  MISMATCHED: 'mismatched',
  SELECTED: 'selected',
  UNSELECTED: 'unselected'
}

export class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: states.UNSELECTED
    }
  }

  handleClick = (e) => {
    switch(this.props.status) {
      case states.UNSELECTED:
        this.props.selectCard(this.props.id, this.props.rank, this.props.suit)
        break;
      case states.SELECTED:
        this.props.unSelectCard(this.props.id, this.props.rank, this.props.suit)
        break;
    }
  }

  setImage = () => {
    let img
    let status = this.props.status
    if (status == states.UNSELECTED) {
      img = this.props.back
    } else if (status == states.SELECTED){
      img = this.props.front
    } else if (status == states.MATCHED){
      img = this.props.front
    } else {
      img = this.props.back
    }
    return img
  }

  render() {
    let img = this.setImage()
    return (
      <div className="Card" onClick={this.handleClick}>
        <img src={img}/>
      </div>
    )
  }
}
