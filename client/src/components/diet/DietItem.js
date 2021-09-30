import styled from 'styled-components';

const DietItemStyle = styled.div`
  width: fit-content;
  border-radius: 5px;
  display: flex;
  background-color: #fff;

  button {
    padding: 3px 5px;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0);
    color: #000;
    border: none;
    &.main-btn {
      cursor: pointer;
      &:hover {
        color: #fc9f77;
      }
      &:active {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }

    &.remove-btn {
      cursor: pointer;
      :hover {
        color: #f66d6d;
      }

      :active {
        color: #bd0000;
      }
    }
  }
`;

const DietItem = ({ item, removeItem, editable = false }) => {
  const onRemove = () => {
    removeItem(item.name);
  };

  const onClick = () => {};

  return (
    <DietItemStyle onClick={editable ? null : onClick}>
      <button className={editable ? '' : 'main-btn'}>{item.name}</button>
      {editable ? (
        <button className="remove-btn" onClick={onRemove}>
          x
        </button>
      ) : null}
    </DietItemStyle>
  );
};

export default DietItem;
