import styled from 'styled-components';
import { useState, useEffect } from 'react';

import EditButton from '../EditButton';

const DietCardHeaderStyle = styled.div`
  border-radius: 5px 5px 0 0;
  background-color: #dadde6;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > .button-box {
    display: flex;
  }

  > .card-title {
    font-size: 0.9rem;
  }

  > .input-title {
    padding: 0;
    border: none;
    border-bottom: solid 1px #000;
    background-color: rgba(0, 0, 0, 0);
    font-size: 0.9rem;
    outline: none;
    flex-grow: 1;
  }
`;

const DietCardHeader = ({
  title,
  index,
  changeTitle,
  removeCard,
  offEditMode,
  onEditMode,
  editable = false,
  readonly = false,
}) => {
  const [inputTitle, setInputTitle] = useState(title);

  useEffect(() => {
    setInputTitle(title);
  }, [title]);

  const onRemoveCard = () => {
    offEditMode();
    removeCard(index);
  };

  return (
    <DietCardHeaderStyle>
      {!readonly && editable ? (
        <>
          <input
            size="1"
            className="input-title"
            value={inputTitle}
            onChange={e => setInputTitle(e.target.value)}
            onBlur={() => changeTitle(inputTitle)}
          />
          <div className="button-box">
            <EditButton type="remove" onClick={onRemoveCard} />
            <EditButton type="edit-off" onClick={offEditMode} />
          </div>
        </>
      ) : (
        <>
          <h3 className="card-title">{title}</h3>
          {readonly || (
            <div className="button-box">
              <EditButton type="edit-on" onClick={onEditMode} />
            </div>
          )}
        </>
      )}
    </DietCardHeaderStyle>
  );
};

export default DietCardHeader;
