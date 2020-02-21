import React, { Component } from 'react';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'; 
import TouchBackend from 'react-dnd-touch-backend';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import _ from 'lodash';
import { Board } from './Board';

let _columnId = 0;
let _cardId = 0;

//Creating cards
const initialCards = Array.from({ length: 9 }, () => ({
  id: ++_cardId,
  title: `Card ${_cardId}`,
}));

//Creating columns
const initialColumns = Array.from(["Todo", "Doing", "Done"], (title, i) => ({
  id: _columnId++,
  title,
  cardIds: initialCards.slice(i * 3, i * 3 + 3).map(card => card.id),
}))

export default class Controller extends Component {
  state = {
    cards: initialCards,
    columns: initialColumns,
  };

  addCard = (columnId, _title) => {
    const title = _title.trim();
    if (!title) return;

    const newCard = { id: ++_cardId, title };
    this.setState(state => ({
      cards: [...state.cards, newCard],
      columns: state.columns.map(
        column =>
          column.id === columnId
            ? { ...column, cardIds: [...column.cardIds, newCard.id] }
            : column
      ),
    }));
  };

  moveCard = (cardId, destColumnId, index) => {
    this.setState(state => ({
      columns: state.columns.map(column => ({
        ...column,
        cardIds: _.flowRight(
          // 2) If this is the destination column, insert the cardId.
          ids =>
            column.id === destColumnId
              ? [...ids.slice(0, index), cardId, ...ids.slice(index)]
              : ids,
          // 1) Remove the cardId for all columns
          ids => ids.filter(id => id !== cardId)
        )(column.cardIds),
      })),
    }));
  };

  
  render() {
    return (
      <DndProvider backend={HTML5Backend} >
      <Board
        cards={this.state.cards}
        columns={this.state.columns}
        moveCard={this.moveCard}
        addCard={this.addCard}
      />
      </DndProvider>
    );
  }
}


// npm i classnames
// npm i lodash
// npm i react-dnd 
// npm i react-dnd-html5-backend
// npm i react-dnd-touch-backend
// npm i react-dnd-multi-backend