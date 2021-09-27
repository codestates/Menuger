import { useState } from 'react';
import styled from 'styled-components';

const ItemAddorStyle = styled.form`
  background-color: #d0d0d0;
  border-radius: 0 0 5px 5px;
  padding: 10px;

  .input-item-box {
    height: 25px;
    display: flex;

    input {
      width: 70%;
    }

    button[type='submit'] {
      width: 30%;
      margin-left: 3px;
    }
  }

  button[type='button'] {
    width: 100%;
    height: 25px;
    margin-top: 5px;
  }
`;

const ItemAddor = ({ addItem }) => {
  const [inputItem, setInputItem] = useState('');
  const onSubmit = e => {
    e.preventDefault();
    addItem(inputItem);
    setInputItem('');
  };
  return (
    <ItemAddorStyle onSubmit={onSubmit}>
      <div className="input-item-box">
        <input type="text" value={inputItem} onChange={e => setInputItem(e.target.value)} />
        <button type="submit">추가</button>
      </div>
    </ItemAddorStyle>
  );
};

export default ItemAddor;
