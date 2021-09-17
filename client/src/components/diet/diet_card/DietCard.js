import { useState } from 'react';
import styled from 'styled-components';

//import components
import DietCardHeader from './DietCardHeader';
import ItemAddor from './ItemAddor';
import DietItemList from './DietItemList';
import { useEffect } from 'react';

const DietCardStyle = styled.div`
  min-height: 30px;
  border: solid 1px #000;
  border-radius: 5px;
  position: relative;
  cursor: ${props => (props.draggable ? 'grab' : 'default')};
`;

const DietCard = ({ card, removeCard, updateCard, editable = false, readonly = false }) => {
  const { title, dietitem } = card;
  const [isEditMode, setIsEditMode] = useState(editable);

  useEffect(() => {
    if (readonly === true) {
      setIsEditMode(false);
    }
  }, [readonly]);

  const onEditMode = () => {
    setIsEditMode(true);
  };

  const offEditMode = () => {
    setIsEditMode(false);
  };

  const addItem = content => {
    const newItem = {
      id: -1,
      content: content,
    };
    updateCard({
      ...card,
      dietitem: [...card.dietitem, newItem],
    });
  };

  const removeItem = content => {
    updateCard({
      ...card,
      dietitem: card.dietitem.filter(itemInList => {
        return itemInList.content !== content;
      }),
    });
  };

  const changeTitle = newTitle => {
    updateCard({
      ...card,
      title: newTitle,
    });
  };

  const onRemoveCard = () => {
    removeCard(card);
  };

  const onDragStart = e => {
    e.dataTransfer.setData('card', JSON.stringify(card));
  };

  return (
    <DietCardStyle draggable={!readonly && !isEditMode} onDragStart={onDragStart}>
      <DietCardHeader
        title={title}
        changeTitle={changeTitle}
        onRemoveCard={onRemoveCard}
        offEditMode={offEditMode}
        onEditMode={onEditMode}
        editable={isEditMode}
        readonly={readonly}
      />
      <DietItemList
        dietitem={dietitem}
        removeItem={removeItem}
        editable={isEditMode}
        readonly={readonly}
      />
      {!readonly && isEditMode && <ItemAddor addItem={addItem} />}
    </DietCardStyle>
  );
};

export default DietCard;
