import styled from 'styled-components';
import { HiOutlineTrash, HiPencil, HiCheck } from 'react-icons/hi';
import { lighten, darken } from 'polished';

const EditButtonStyle = styled.button`
  background-color: rgba(0, 0, 0, 0);
  color: #5e5e5e;
  border: none;
  cursor: pointer;
  padding: 0 2px;

  &.edit-on:hover {
    color: ${darken(0.3, '#5e5e5e')};
  }

  &.edit-on:active {
    color: ${lighten(0.1, '#5e5e5e')};
  }

  &.edit-off:hover {
    color: #9be998;
  }

  &.edit-off:active {
    color: ${darken(0.3, '#9be998')};
  }

  &.remove:hover {
    color: #f66d6d;
  }

  &.remove:active {
    color: ${darken(0.2, '#f66d6d')};
  }
`;

const EditButton = ({ type, onClick }) => {
  const types = {
    remove: <HiOutlineTrash size="16px" />,
    'edit-on': <HiPencil />,
    'edit-off': <HiCheck size="16px" />,
  };
  return (
    <EditButtonStyle onClick={onClick} className={type}>
      {types[type]}
    </EditButtonStyle>
  );
};

export default EditButton;
