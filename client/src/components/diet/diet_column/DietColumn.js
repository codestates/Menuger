import styled from 'styled-components';
import { allowDrop } from '../../../utils/drag';
import { useDragCardData, useDragColumnData } from '../../../utils/drag';
import { useRef, useState } from 'react';

//import components
import DietColumnHeader from './DietColumnHeader';
import AddCardButton from './AddCardButton';
import DietCardList from './DietCardList';

const DietColumnStyle = styled.div`
  min-width: 200px;
  border-radius: 5px;
  overflow-y: hidden;
  background-color: #f5f5f5;
  box-shadow: 0 1px rgba(0, 0, 0, 0.3);
  > .button-container {
    padding: 10px;
  }
`;

const DietColumn = ({
  column,
  index,
  updateColumn,
  removeColumn,
  setColumnShadowIndex,
  moveCard,
  readonly = false,
}) => {
  const [shadowIndex, setShadowIndex] = useState(-1);
  const { title } = column;
  const columnView = useRef();
  const dragEnterAndLeaveCount = useRef(0);
  const dragCardData = useDragCardData();
  const dragColumnData = useDragColumnData();

  const changeTitle = newTitle => {
    updateColumn(
      {
        ...column,
        title: newTitle,
      },
      index,
    );
  };

  const setFromColumn = dragData => {
    dragData.setFromColumn(column, index);
  };

  const addCard = () => {
    const initCard = { title: '식단 카드', dietItemList: [] };
    const newColumn = {
      ...column,
      dietCardList: [...column.dietCardList, initCard],
    };
    updateColumn(newColumn, index);
  };

  const updateCard = (card, cardIndex) => {
    const newColumn = {
      ...column,
      dietCardList: [
        ...column.dietCardList.slice(0, cardIndex),
        card,
        ...column.dietCardList.slice(cardIndex + 1, column.dietCardList.length),
      ],
    };
    updateColumn(newColumn, index);
  };

  const removeCard = cardIndex => {
    const newColumn = {
      ...column,
      dietCardList: [
        ...column.dietCardList.slice(0, cardIndex),
        ...column.dietCardList.slice(cardIndex + 1, column.dietCardList.length),
      ],
    };
    updateColumn(newColumn, index);
  };

  const onDragStart = e => {
    e.dataTransfer.effectAllowed = 'move';
    const { layerX, layerY } = e.nativeEvent;
    e.dataTransfer.setDragImage(columnView.current, layerX, layerY);

    dragColumnData.setColumn(column, index);
  };

  const onDragEnter = () => {
    if (
      dragEnterAndLeaveCount.current === 0 &&
      column.dietCardList.length === 0 &&
      dragCardData.card !== null
    ) {
      setShadowIndex(0);
    }
    dragEnterAndLeaveCount.current++;
  };

  const onDragLeave = () => {
    dragEnterAndLeaveCount.current--;
    if (dragEnterAndLeaveCount.current === 0) {
      setShadowIndex(-1);
    }
  };

  const onDragOver = e => {
    allowDrop(e);
    const { column } = dragColumnData;
    if (column === null) {
      return;
    }
    const halfOfWidth = columnView.current.clientWidth / 2;
    const { layerX } = e.nativeEvent;
    if (halfOfWidth > layerX) {
      dragColumnData.setToIndex(index);
      setColumnShadowIndex(index);
    } else {
      dragColumnData.setToIndex(index + 1);
      setColumnShadowIndex(index + 1);
    }
  };

  const onDrop = e => {
    const { card, index: cardIndex, fromColumn } = dragCardData;
    let { toIndex: cardToIndex } = dragCardData;

    if (card === null) {
      return;
    }

    const newFromDietCardList = [...fromColumn.column.dietCardList];
    newFromDietCardList.splice(cardIndex, 1);
    const newFromColumn = {
      ...fromColumn.column,
      dietCardList: newFromDietCardList,
    };
    let newDietCardList = [...column.dietCardList];

    if (index === fromColumn.index) {
      newDietCardList = newFromDietCardList;
      if (cardIndex < cardToIndex) {
        cardToIndex--;
      }
    }

    newDietCardList.splice(cardToIndex, 0, card);
    const newColumn = {
      ...column,
      dietCardList: newDietCardList,
    };
    moveCard(dietColumnList => {
      const newDietCardList = [...dietColumnList];
      newDietCardList.splice(fromColumn.index, 1, newFromColumn);
      newDietCardList.splice(index, 1, newColumn);
      return newDietCardList;
    });

    setShadowIndex(-1);
    dragEnterAndLeaveCount.current = 0;
  };

  const onDragEnd = () => {
    dragColumnData.dragEnd();
  };

  return (
    <DietColumnStyle
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      ref={columnView}
    >
      <DietColumnHeader
        index={index}
        title={title}
        changeTitle={changeTitle}
        removeColumn={removeColumn}
        readonly={readonly}
      />
      <DietCardList
        column={column}
        removeCard={removeCard}
        updateCard={updateCard}
        setFromColumn={setFromColumn}
        readonly={readonly}
        shadowIndex={shadowIndex}
        setShadowIndex={setShadowIndex}
      />
      {!readonly && (
        <div className="button-container">
          <AddCardButton addCard={addCard} />
        </div>
      )}
    </DietColumnStyle>
  );
};

export default DietColumn;
