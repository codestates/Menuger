import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setSelectedContainer } from '../../modules/dietColumnContainer';
import { compareOrder } from '../../utils/compareFunction';

//import components
import DietColumn from './diet_column/DietColumn';

const DietColumnContainerStyle = styled.div`
  width: 100%;
  height: 500px;
  padding: 20px;
  border: solid 1px #000;
  border-radius: 5px;
  display: flex;
  overflow-x: auto;

  .column-list {
    display: flex;
    > li:not(:first-child) {
      margin-left: 10px;
    }
  }
`;

const AddColumnButton = styled.button`
  width: 300px;
  height: 100%;
  display: block;
  border: dashed 1px #000;
  border-radius: 5px;
  margin-left: 10px;
  font-size: 50px;
  cursor: pointer;
  background-color: #d0d0d0;
  flex-shrink: 0;

  &:hover {
    background-color: #d8d8d8;
  }

  &:active {
    background-color: #bfbebe;
  }
`;

const DietColumnContainer = ({ columnList, readonly = false }) => {
  const dispatch = useDispatch();

  const updateColumn = column => {
    const newColumnList = columnList.filter(columnInList => {
      return columnInList.order !== column.order;
    });
    newColumnList.push(column);
    newColumnList.sort(compareOrder);
    dispatch(setSelectedContainer(newColumnList));
  };

  const removeColumn = column => {
    const newColumnList = columnList.filter(columnInList => {
      return columnInList.order !== column.order;
    });
    dispatch(setSelectedContainer(newColumnList));
  };

  const moveCard = getMoveResult => {
    const [fromColumn, toColumn] = getMoveResult();
    const newColumnList = columnList.filter(columnInList => {
      return columnInList.order !== fromColumn.order && columnInList.order !== toColumn.order;
    });
    newColumnList.push(fromColumn);
    newColumnList.push(toColumn);
    newColumnList.sort(compareOrder);
    dispatch(setSelectedContainer(newColumnList));
  };

  const addColumn = () => {
    const newColumnList = [...columnList, { id: -1, order: -1, title: 'new column', dietcard: [] }];
    newColumnList.forEach((column, index) => {
      column.order = index;
    });

    dispatch(setSelectedContainer(newColumnList));
  };

  return (
    <DietColumnContainerStyle>
      <ul className="column-list">
        {columnList.map(column => {
          return (
            <li key={column.order}>
              <DietColumn
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
      {readonly || <AddColumnButton onClick={addColumn}>+</AddColumnButton>}
    </DietColumnContainerStyle>
  );
};

export default DietColumnContainer;
