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

const DietItemList = ({ dietitem, removeItem, editable = false, readonly = false }) => {
  return (
    <DietItemListStyle>
      {!readonly && editable
        ? dietitem.map(item => {
            return (
              <li key={item.content}>
                <DietItem content={item.content} removeItem={removeItem} editable />
              </li>
            );
          })
        : dietitem.map(item => {
            return (
              <li key={item.content}>
                <DietItem content={item.content} />
              </li>
            );
          })}
    </DietItemListStyle>
  );
};

export default DietItemList;
