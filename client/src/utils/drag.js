import React from 'react';
import { useContext } from 'react';

//drop할 요소의 onDropOver에 설정
export const allowDrop = e => {
  e.preventDefault();
};

class DragCardData {
  constructor() {
    this.card = null;
    this.index = -1;
    this.toIndex = -1;
    this.fromColumn = {
      index: -1,
      column: null,
    };
  }

  setCard(card, index) {
    this.card = card;
    this.index = index;
  }

  setToIndex(toIndex) {
    this.toIndex = toIndex;
  }

  setFromColumn(column, index) {
    this.fromColumn = {
      index,
      column,
    };
  }

  dragEnd() {
    this.card = null;
    this.index = -1;
    this.toIndex = -1;
    this.fromColumn = {
      index: -1,
      column: null,
    };
  }
}

class DragColumnData {
  constructor() {
    this.column = null;
    this.index = -1;
    this.toIndex = -1;
  }

  setColumn(column, index) {
    this.column = column;
    this.index = index;
  }

  setToIndex(toIndex) {
    this.toIndex = toIndex;
  }

  dragEnd() {
    this.column = null;
    this.index = -1;
    this.toIndex = -1;
  }
}

export const DragCardDataContext = React.createContext(null);
export const DragColumnDataContext = React.createContext(null);
export const useDragCardData = () => {
  return useContext(DragCardDataContext);
};
export const useDragColumnData = () => {
  return useContext(DragColumnDataContext);
};

const DragDataProvider = ({ children }) => {
  return (
    <DragColumnDataContext.Provider value={new DragColumnData()}>
      <DragCardDataContext.Provider value={new DragCardData()}>
        {children}
      </DragCardDataContext.Provider>
    </DragColumnDataContext.Provider>
  );
};

export default DragDataProvider;
