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

const Shadow = styled.div`
  height: 40px;
  border-radius: 5px;
  background-color: #dadde6;
  margin-bottom: 10px;
  animation-duration: 0.3s;
  animation-name: card-shadow;

  @keyframes card-shadow {
    from {
      height: 10px;
    }

    to {
      height: 40px;
    }
  }
`;

const DietCardList = ({
  column,
  removeCard,
  updateCard,
  readonly = false,
  setFromColumn,
  shadowIndex,
  setShadowIndex,
}) => {
  const { dietCardList } = column;
  return (
    <DietCardListStyle>
      {dietCardList.map((card, i) => {
        return (
          <li key={i}>
            <>
              {shadowIndex === i && <Shadow />}
              <DietCard
                index={i}
                card={card}
                removeCard={removeCard}
                updateCard={updateCard}
                setFromColumn={setFromColumn}
                readonly={readonly}
                setShadowIndex={setShadowIndex}
              />
            </>
          </li>
        );
      })}
      {shadowIndex >= dietCardList.length && (
        <li key={dietCardList.length}>
          <Shadow />
        </li>
      )}
    </DietCardListStyle>
  );
};

export default DietCardList;
