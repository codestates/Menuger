import styled from 'styled-components';

//import components
import DietItem from '../DietItem';

const DietItemListStyle = styled.ul`
  padding: 10px;
  display: flex;
  flex-direction: column;

  > li:not(:first-child) {
    margin-top: 4px;
  }
`;

const DietItemList = ({ dietItemList, removeItem, editable = false, readonly = false }) => {
  return (
    <DietItemListStyle>
      {dietItemList.map((item, i) => {
        return (
          <li key={i}>
            <DietItem item={item} removeItem={removeItem} editable={editable} readonly={readonly} />
          </li>
        );
      })}
    </DietItemListStyle>
  );
};

export default DietItemList;
