import styled from 'styled-components';

//import components
import DietCard from '../diet_card/DietCard';

const DietCardListStyle = styled.ul`
  height: fit-content;
  padding: 10px;
  overflow-y: auto;

  > li:not(:first-child) {
    margin-top: 10px;
  }
`;

const DietCardList = ({ column, removeCard, updateCard, readonly = false, setFromColumn }) => {
  const { dietCardList } = column;
  return (
    <DietCardListStyle>
      {dietCardList.map((card, i) => {
        return (
          <li key={i}>
            <DietCard
              index={i}
              card={card}
              removeCard={removeCard}
              updateCard={updateCard}
              setFromColumn={setFromColumn}
              readonly={readonly}
            />
          </li>
        );
      })}
    </DietCardListStyle>
  );
};

export default DietCardList;
