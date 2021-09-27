import { useState, useEffect } from 'react';
import styled from 'styled-components';

//import components
import EditButton from '../EditButton';

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
            <EditButton type="remove" onClick={onRemoveColumn} />
            <EditButton type="edit-off" onClick={offEditMode} />
          </div>
        </>
      ) : (
        <>
          <h2>{title}</h2>
          {readonly || (
            <div className="button-box">
              <EditButton type="edit-on" onClick={onEditMode} />
            </div>
          )}
        </>
      )}
    </DietColumnHeaderStyle>
  );
};

export default DietColumnHeader;
