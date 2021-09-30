import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDragCardData } from '../../../utils/drag';

//import components
import DietCardHeader from './DietCardHeader';
import ItemAddor from './ItemAddor';
import DietItemList from './DietItemList';

const DietCardStyle = styled.div`
  min-height: 30px;
  border-radius: 5px;
  position: relative;
  cursor: ${props => (props.draggable ? 'grab' : 'default')};
  background-color: ${props => (props.isSelected ? '#f5f5f5' : '#fff')};
  box-shadow: 0 1px rgba(0, 0, 0, 0.3);
`;

const DietCard = ({
  card,
  index,
  removeCard,
  updateCard,
  editable = false,
  readonly = false,
  setFromColumn,
}) => {
  const { title, dietItemList } = card;
  const [isEditMode, setIsEditMode] = useState(editable);
  const [isSelected, setIsSelected] = useState(false);
  const dragCardData = useDragCardData();
  const cardView = useRef();
  const enterAndLeaveCount = useRef(0);

  useEffect(() => {
    if (readonly === true) {
      setIsEditMode(false);
    }
  }, [readonly]);

  const changeTitle = newTitle => {
    updateCard(
      {
        ...card,
        title: newTitle,
      },
      index,
    );
  };

  const addItem = name => {
    const newItem = {
      name,
    };

    updateCard(
      {
        ...card,
        dietItemList: [...card.dietItemList, newItem],
      },
      index,
    );
  };

  const removeItem = name => {
    updateCard(
      {
        ...card,
        dietItemList: card.dietItemList.filter(itemInList => {
          return itemInList.name !== name;
        }),
      },
      index,
    );
  };

  const onEditMode = () => {
    setIsEditMode(true);
  };

  const offEditMode = () => {
    setIsEditMode(false);
  };

  const onDragStart = e => {
    e.stopPropagation();
    dragCardData.setCard(card, index);
    setFromColumn(dragCardData);
    setIsSelected(true);
  };

  const onDragEnd = e => {
    dragCardData.dragEnd();
    setIsSelected(false);
  };

  const onDragEnter = () => {
    enterAndLeaveCount.current++;
  };

  const onDragLeave = () => {
    enterAndLeaveCount.current--;
  };

  const onDragOver = e => {
    const halfOfHeight = cardView.current.clientHeight / 2;
    const { layerY } = e.nativeEvent;
    if (halfOfHeight > layerY) {
      dragCardData.setToIndex(index);
    } else {
      dragCardData.setToIndex(index + 1);
    }
  };

  return (
    <DietCardStyle
      isSelected={isSelected}
      draggable={!readonly && !isEditMode}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      ref={cardView}
    >
      <DietCardHeader
        title={title}
        index={index}
        changeTitle={changeTitle}
        removeCard={removeCard}
        offEditMode={offEditMode}
        onEditMode={onEditMode}
        editable={isEditMode}
        readonly={readonly}
      />
      <DietItemList
        dietItemList={dietItemList}
        removeItem={removeItem}
        editable={isEditMode}
        readonly={readonly}
      />
      {!readonly && isEditMode && <ItemAddor addItem={addItem} />}
    </DietCardStyle>
  );
};

export default DietCard;
