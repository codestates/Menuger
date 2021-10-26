import styled from 'styled-components';
import { allowDrop } from '../../utils/drag';
import { useDragColumnData } from '../../utils/drag';
import { lighten, darken } from 'polished';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

//import components
import DietColumn from './diet_column/DietColumn';

const DietColumnContainerStyle = styled.div`
  padding: 20px;
  border: solid 1px #dadde6;
  border-radius: 5px;
  display: flex;
  overflow-x: auto;
  background-color: ${({ isDark, readonly }) =>
    isDark ? (readonly ? '#424656' : '#202225') : 'transparent'};

  > .column-list {
    width: ${props => props.readonly && '1px'};
    display: flex;

    > li {
      display: flex;
      height: fit-content;
    }
    > li:not(:first-child) {
      margin-left: 10px;
    }
  }
`;

const AddColumnButton = styled.button`
  min-width: 200px;
  min-height: 200px;
  max-height: 300px;
  display: block;
  border: dashed 1px #bbbec5;
  border-radius: 5px;
  margin-left: 10px;
  font-size: 50px;
  cursor: pointer;
  background-color: #f5f5f5;
  flex-shrink: 0;

  &:hover {
    background-color: ${lighten(0.01, '#f5f5f5')};
  }

  &:active {
    background-color: ${darken(0.05, '#f5f5f5')};
  }
`;

const Shadow = styled.div`
  height: 100px;
  width: 40px;
  border-radius: 5px;
  background-color: #dadde6;
  margin-right: 10px;
  animation-duration: 0.3s;
  animation-name: column-shadow;

  @keyframes column-shadow {
    from {
      width: 10px;
    }

    to {
      width: 40px;
    }
  }
`;

const DietColumnContainer = ({ dietColumnList, updateColumnList, readonly = false }) => {
  const dragColumnData = useDragColumnData();
  const [columnShadowIndex, setColumnShadowIndex] = useState(-1);
  const dragEnterAndLeaveCount = useRef(0);
  const { isDarkMode } = useSelector(state => state.theme);

  const addColumn = () => {
    const initColumn = { title: '식단 열', dietCardList: [] };
    const newColumnList = [...dietColumnList, initColumn];
    updateColumnList(newColumnList);
  };

  const updateColumn = (newColumn, columnIndex) => {
    const newColumnList = [
      ...dietColumnList.slice(0, columnIndex),
      newColumn,
      ...dietColumnList.slice(columnIndex + 1, dietColumnList.length),
    ];

    updateColumnList(newColumnList);
  };

  const removeColumn = columnIndex => {
    const newColumnList = [
      ...dietColumnList.slice(0, columnIndex),
      ...dietColumnList.slice(columnIndex + 1, dietColumnList.length),
    ];
    updateColumnList(newColumnList);
  };

  const moveCard = getMoveResult => {
    const newColumnList = getMoveResult(dietColumnList);
    updateColumnList(newColumnList);
  };

  const onDragEnter = () => {
    dragEnterAndLeaveCount.current++;
  };

  const onDragLeave = () => {
    dragEnterAndLeaveCount.current--;
    if (dragEnterAndLeaveCount.current <= 0) {
      setColumnShadowIndex(-1);
    }
  };

  const onDrop = e => {
    const { column, index: columnIndex } = dragColumnData;
    let { toIndex: columnToIndex } = dragColumnData;
    if (column === null) {
      return;
    }

    if (e.ctrlKey === false && columnToIndex > columnIndex) {
      columnToIndex--;
    }

    const newColumnList = [...dietColumnList];
    if (e.ctrlKey === false) {
      newColumnList.splice(columnIndex, 1);
    }
    newColumnList.splice(columnToIndex, 0, column);
    updateColumnList(newColumnList);
    setColumnShadowIndex(-1);
  };

  return (
    <DietColumnContainerStyle
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={allowDrop}
      onDrop={onDrop}
      readonly={readonly}
      isDark={isDarkMode}
    >
      <ul className="column-list">
        {dietColumnList.map((column, i) => {
          return (
            <li key={i}>
              <>
                {columnShadowIndex === i && <Shadow />}
                <DietColumn
                  index={i}
                  column={column}
                  updateColumn={updateColumn}
                  removeColumn={removeColumn}
                  setColumnShadowIndex={setColumnShadowIndex}
                  moveCard={moveCard}
                  readonly={readonly}
                />
              </>
            </li>
          );
        })}
        {columnShadowIndex >= dietColumnList.length && (
          <li key={dietColumnList.length}>
            <Shadow />
          </li>
        )}
      </ul>
      {!readonly && <AddColumnButton onClick={addColumn}>+</AddColumnButton>}
    </DietColumnContainerStyle>
  );
};

export default DietColumnContainer;
