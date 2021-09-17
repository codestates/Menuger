import styled from 'styled-components';
import { allowDrop } from '../../../utils/drag';
import { compareOrder } from '../../../utils/compareFunction';

//import components
import DietColumnHeader from './DietColumnHeader';
import AddCardButton from './AddCardButton';
import DietCardList from './DietCardList';

const DietColumnStyle = styled.div`
  width: 300px;
  min-height: 0%;
  max-height: 100%;
  border: solid 1px #000;
  border-radius: 5px;
  overflow-y: hidden;

  > .button-container {
    padding: 10px;
  }
`;

const DietColumn = ({ column, updateColumn, removeColumn, moveCard, readonly = false }) => {
  const { title } = column;

  const addCard = (target, card) => {
    const newColumn = {
      ...target,
      dietcard: [...target.dietcard, { ...card }],
    };
    newColumn.dietcard.forEach((cardInColumn, index) => {
      cardInColumn.order = index;
    });

    return newColumn;
  };

  const changeTitle = title => {
    updateColumn({
      ...column,
      title,
    });
  };

  const removeCard = (target, card) => {
    const newColumn = {
      ...target,
      dietcard: target.dietcard.filter(cardInList => {
        return cardInList.order !== card.order;
      }),
    };
    return newColumn;
  };

  const updateCard = card => {
    const newColumn = {
      ...column,
      dietcard: column.dietcard.filter(cardInColumn => {
        return cardInColumn.order !== card.order;
      }),
    };

    newColumn.dietcard.push(card);
    newColumn.dietcard.sort(compareOrder);
    updateColumn(newColumn);
  };

  const onRemoveColumn = () => {
    removeColumn(column);
  };

  const onDragStart = e => {
    const card = JSON.parse(e.dataTransfer.getData('card') || 'null');
    if (card === null) return;
    e.dataTransfer.setData('fromColumn', JSON.stringify(column));
  };

  const onDrop = e => {
    const card = JSON.parse(e.dataTransfer.getData('card') || 'null');
    const fromColumn = JSON.parse(e.dataTransfer.getData('fromColumn') || 'null');
    if (card === null) return;

    const getMoveResult = (isCopy = false) => {
      if (isCopy === true) {
        return [addCard(column, card), fromColumn];
      }
      return [addCard(column, card), removeCard(fromColumn, card)];
    };

    moveCard(getMoveResult);
  };

  return (
    <DietColumnStyle onDrop={onDrop} onDragOver={allowDrop} onDragStart={onDragStart}>
      <DietColumnHeader
        title={title}
        changeTitle={changeTitle}
        onRemoveColumn={onRemoveColumn}
        readonly={readonly}
      />
      <DietCardList
        column={column}
        updateColumn={updateColumn}
        removeCard={removeCard}
        updateCard={updateCard}
        readonly={readonly}
      />
      {readonly || (
        <div className="button-container">
          <AddCardButton updateColumn={updateColumn} addCard={addCard} column={column} />
        </div>
      )}
    </DietColumnStyle>
  );
};

export default DietColumn;
