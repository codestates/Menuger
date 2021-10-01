import styled from 'styled-components';
import { allowDrop } from '../../utils/drag';
import { useDragColumnData } from '../../utils/drag';

//import components
import DietColumn from './diet_column/DietColumn';

const DietColumnContainerStyle = styled.div`
  width: 100%;
  padding: 20px;
  border: solid 1px #dadde6;
  border-radius: 5px;
  display: flex;
  overflow-x: auto;

  > .column-list {
    display: flex;
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
    background-color: #d8d8d8;
  }

  &:active {
    background-color: #bfbebe;
  }
`;

const DietColumnContainer = ({ dietColumnList, updateColumnList, readonly = false }) => {
  const dragColumnData = useDragColumnData();
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

  const onDrop = () => {
    const { column, index: columnIndex } = dragColumnData;
    let { toIndex: columnToIndex } = dragColumnData;
    if (column === null) {
      return;
    }
    if (columnToIndex > columnIndex) {
      columnToIndex--;
    }
    const newColumnList = [...dietColumnList];
    newColumnList.splice(columnIndex, 1);
    newColumnList.splice(columnToIndex, 0, column);
    updateColumnList(newColumnList);
  };

  return (
    <DietColumnContainerStyle onDragOver={allowDrop} onDrop={onDrop}>
      <ul className="column-list">
        {dietColumnList.map((column, i) => {
          return (
            <li key={i}>
              <DietColumn
                index={i}
                column={column}
                updateColumn={updateColumn}
                removeColumn={removeColumn}
                moveCard={moveCard}
                readonly={readonly}
              />
            </li>
          );
        })}
      </ul>
      {!readonly && <AddColumnButton onClick={addColumn}>+</AddColumnButton>}
    </DietColumnContainerStyle>
  );
};

export default DietColumnContainer;
