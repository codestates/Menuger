import styled from 'styled-components';
import { useState } from 'react';

import EditButton from '../EditButton';

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
            <EditButton type="remove" onClick={onRemoveCard} />
            <EditButton type="edit-off" onClick={offEditMode} />
          </div>
        </>
      ) : (
        <>
          <h3>{title}</h3>
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
