import { useState, useEffect } from 'react';
import styled from 'styled-components';

//import components
import EditButton from '../EditButton';

const DietColumnHeaderStyle = styled.div`
  padding: 15px 20px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: ${props => (props.draggable ? 'grab' : 'default')};
  background-color: #ffc436;

  > .button-box {
    display: flex;
  }

  > .input-title {
    width: auto;
    outline: none;
    border: none;
    border-bottom: solid 1px #000;
    background-color: rgba(0, 0, 0, 0);
    font-size: 1rem;
    padding: 0;
    flex-grow: 1;
  }
`;

const DietColumnHeader = ({ title, index, removeColumn, changeTitle, readonly = false }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputTitle, setInputTitle] = useState(title);

  useEffect(() => {
    if (readonly === true) {
      setIsEditMode(false);
    }
  }, [readonly]);

  useEffect(() => {
    setInputTitle(title);
  }, [title]);

  const onEditMode = () => setIsEditMode(true);
  const offEditMode = () => setIsEditMode(false);
  const onSubmit = () => {
    changeTitle(inputTitle);
    offEditMode();
  };

  const onRemove = () => {
    setIsEditMode(false);
    removeColumn(index);
  };

  return (
    <DietColumnHeaderStyle draggable={!readonly && !isEditMode} onBlur={onSubmit}>
      {!readonly && isEditMode ? (
        <>
          <input
            size="1"
            className="input-title"
            value={inputTitle}
            onChange={e => setInputTitle(e.target.value)}
          />
          <div className="button-box">
            <EditButton type="remove" onClick={onRemove} />
            <EditButton type="edit-off" onClick={onSubmit} />
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
