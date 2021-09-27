import styled from 'styled-components';
import { useState } from 'react';

const DietCardHeaderStyle = styled.div`
  height: 40px;
  border-bottom: solid 1px #000;
  padding: 8px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .input-title {
    border: none;
    border-bottom: solid 1px #000;
    font-size: 1rem;
    outline: none;
  }

  button {
    background-color: rgba(0, 0, 0, 0);
    color: #d0d0d0;
    border: none;
    cursor: pointer;

    &.edit-mode-on-btn:hover {
      color: #000;
    }

    &.edit-mode-on-btn:active {
      color: #757575;
    }

    &.edit-mode-off-btn:hover {
      color: #28ee00;
    }

    &.edit-mode-off-btn:active {
      color: #1ca700;
    }

    &.delete-btn:hover {
      color: #ff0000;
    }

    &.delete-btn:active {
      color: #bd0000;
    }
  }
`;

const DietCardHeader = ({
  title,
  changeTitle,
  onRemoveCard,
  offEditMode,
  onEditMode,
  editable = false,
  readonly = false,
}) => {
  const [inputTitle, setInputTitle] = useState(title);

  return (
    <DietCardHeaderStyle>
      {!readonly && editable ? (
        <>
          <input
            className="input-title"
            value={inputTitle}
            onChange={e => setInputTitle(e.target.value)}
            onBlur={() => changeTitle(inputTitle)}
          />
          <div className="button-box">
            <button className="delete-btn" onClick={onRemoveCard}>
              ✕
            </button>
            <button className="edit-mode-off-btn" onClick={offEditMode}>
              ✔
            </button>
          </div>
        </>
      ) : (
        <>
          <h3>{title}</h3>
          {readonly || (
            <div className="button-box">
              <button className="edit-mode-on-btn" onClick={onEditMode}>
                ✎
              </button>
            </div>
          )}
        </>
      )}
    </DietCardHeaderStyle>
  );
};

export default DietCardHeader;
