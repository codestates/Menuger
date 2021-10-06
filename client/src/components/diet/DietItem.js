import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';

const DietItemStyle = styled.div`
  width: fit-content;
  border-radius: 5px;
  display: flex;
  background-color: #fff;

  button {
    padding: 3px 5px;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0);
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

const MainButton = styled.button`
  padding: 3px 5px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  cursor: inherit;

  ${props =>
    props.hoverable &&
    css`
      cursor: pointer;
      &:hover {
        color: #fc9f77;
      }
    `}
`;

const DietItem = ({ item, removeItem, editable = false, readonly = false }) => {
  const onRemove = () => {
    removeItem(item.name);
  };

  const onClick = () => {};

  return (
    <DietItemStyle onClick={editable ? null : onClick}>
      <MainButton hoverable={readonly}>{item.name}</MainButton>
      {editable ? (
        <button className="remove-btn" onClick={onRemove}>
          x
        </button>
      ) : null}
    </DietItemStyle>
  );
};

export default DietItem;
