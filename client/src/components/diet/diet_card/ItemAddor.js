import { useState } from 'react';
import styled from 'styled-components';

const ItemAddorStyle = styled.form`
  background-color: #dadde6;
  border-radius: 0 0 5px 5px;
  padding: 10px;

  .input-item-box {
    height: 25px;
    display: flex;

    input {
      border: none;
      outline: none;
      text-indent: 2px;
      border-radius: 5px;
      box-shadow: 0 1px rgba(0, 0, 0, 0.3);
      flex-grow: 1;
    }

    button[type='submit'] {
      cursor: pointer;
      width: 45px;
      margin-left: 5px;
      border: none;
      border-radius: 5px;
      background-color: #9be998;
      box-shadow: 0 1px rgba(0, 0, 0, 0.3);

      &:hover {
        background-color: #a0f19d;
      }

      &:active {
        background-color: #8fd78c;
      }
    }
  }
`;

const ItemAddor = ({ addItem }) => {
  const [inputItem, setInputItem] = useState('');
  const onSubmit = e => {
    e.preventDefault();
    if (inputItem.length <= 0) {
      return;
    }
    addItem(inputItem);
    setInputItem('');
  };
  return (
    <ItemAddorStyle onSubmit={onSubmit}>
      <div className="input-item-box">
        <input
          size="1"
          type="text"
          value={inputItem}
          onChange={e => setInputItem(e.target.value)}
        />
        <button type="submit">추가</button>
      </div>
    </ItemAddorStyle>
  );
};

export default ItemAddor;
