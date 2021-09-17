import styled from 'styled-components';

const DietItemStyle = styled.div`
  width: fit-content;
  border: solid 1px #000;
  border-radius: 5px;
  background-color: #555555;
  display: flex;

  button {
    padding: 3px 5px;
    border-radius: 5px;
    background-color: #555555;
    border: none;
    color: #ffffff;
    cursor: pointer;

    &.main-btn {
      &:hover {
        background-color: #808080;
      }
      &:active {
        background-color: #393939;
      }
    }

    &.remove-btn {
      &:hover {
        background-color: #808080;
      }
      &:active {
        background-color: #393939;
      }
    }
  }
`;

const DietItem = ({ content, removeItem, editable = false }) => {
  const onRemove = () => {
    removeItem(content);
  };
  const onClick = e => {
    e.stopPropagation();
  };
  return (
    <DietItemStyle onClick={editable ? null : onClick}>
      <button className="main-btn">{content}</button>
      {editable ? (
        <button className="remove-btn" onClick={onRemove}>
          x
        </button>
      ) : null}
    </DietItemStyle>
  );
};

export default DietItem;
