import styled from 'styled-components';

//import components
import DietCard from '../diet_card/DietCard';

const DietCardListStyle = styled.ul`
  height: fit-content;
  max-height: 365px;
  padding: 10px;
  overflow-y: auto;

  > li:not(:first-child) {
    margin-top: 10px;
  }
`;

const DietCardList = ({ column, updateColumn, removeCard, updateCard, readonly = false }) => {
  const { dietcard } = column;
  return (
    <DietCardListStyle>
      {dietcard.map(card => {
        return (
          <li key={card.id}>
            <DietCard
              card={card}
              removeCard={card => {
                updateColumn(removeCard(column, card));
              }}
              updateCard={updateCard}
              readonly={readonly}
            />
          </li>
        );
      })}
    </DietCardListStyle>
  );
};

export default DietCardList;
