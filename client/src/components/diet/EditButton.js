import styled from 'styled-components';

const EditButtonStyle = styled.button`
  background-color: rgba(0, 0, 0, 0);
  color: #5e5e5e;
  border: none;
  cursor: pointer;

  &.edit-on:hover {
    color: #000000;
  }

  &.edit-on:active {
    color: #757575;
  }

  &.edit-off:hover {
    color: #9be998;
  }

  &.edit-off:active {
    color: #1ca700;
  }

  &.remove:hover {
    color: #f66d6d;
  }

  &.remove:active {
    color: #bd0000;
  }
`;

const EditButton = ({ type, onClick }) => {
  const types = {
    remove: '✕',
    'edit-on': '✎',
    'edit-off': '✔',
  };
  return (
    <EditButtonStyle onClick={onClick} className={type}>
      {types[type]}
    </EditButtonStyle>
  );
};

export default EditButton;
