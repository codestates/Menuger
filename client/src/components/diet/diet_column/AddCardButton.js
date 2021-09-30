import styled from 'styled-components';

const AddCardButtonStyle = styled.button`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  font-size: 0.8rem;
  text-indent: 0.2rem;
  cursor: pointer;
  background-color: #f5f5f5;
  /* background-color: #d0d0d0; */

  &:hover {
    background-color: #d8d8d8;
  }

  &:active {
    background-color: #bfbebe;
  }
`;

const AddCardButton = ({ addCard }) => {
  return <AddCardButtonStyle onClick={addCard}>+ 식단 추가</AddCardButtonStyle>;
};

export default AddCardButton;
