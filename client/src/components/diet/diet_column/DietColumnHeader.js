import { useState, useEffect } from 'react';
import styled from 'styled-components';

const DietColumnHeaderStyle = styled.div`
  height: 40px;
  border-bottom: solid 1px #000;
  padding: 8px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: ${props => (props.draggable ? 'grab' : 'default')};

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

    &.edit-title-btn:hover {
      color: #000;
    }

    &.edit-title-btn:active {
      color: #757575;
    }

    &.check-btn:hover {
      color: #28ee00;
    }

    &.check-btn:active {
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

const DietColumnHeader = ({ title, onRemoveColumn, changeTitle, readonly = false }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputTitle, setInputTitle] = useState(title);

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

  return (
    <DietColumnHeaderStyle draggable={!readonly}>
      {!readonly && isEditMode ? (
        <>
          <input
            className="input-title"
            value={inputTitle}
            onChange={e => setInputTitle(e.target.value)}
            onBlur={() => changeTitle(inputTitle)}
          />
          <div className="button-box">
            <button className="delete-btn" onClick={onRemoveColumn}>
              ✕
            </button>
            <button className="check-btn" onClick={offEditMode}>
              ✔
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>{title}</h2>
          {readonly || (
            <div className="button-box">
              <button className="edit-title-btn" onClick={onEditMode}>
                ✎
              </button>
            </div>
          )}
        </>
      )}
    </DietColumnHeaderStyle>
  );
};

export default DietColumnHeader;
