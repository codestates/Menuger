import { createBrowserHistory } from 'history';
import styled, { css } from 'styled-components';

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
  const modalConfig = { width: 50, height: 45, padding: 2.5, overflow: 'hidden' };
  const history = createBrowserHistory({ forceRefresh: true });

  const handleItemClick = () => {
    localStorage.setItem('option', '/recipes');
    localStorage.setItem('searched', `${item.name}`);
    history.push({
      pathname: '/recipes',
      search: '?sort=dd',
      state: { input: `${item.name}` },
    });
  };

  const onRemove = () => {
    removeItem(item.name);
  };

  const onClick = () => {};

  return (
    <DietItemStyle onClick={editable ? null : onClick}>
      <MainButton onClick={handleItemClick} hoverable={readonly}>
        {item.name}
      </MainButton>
      {editable ? (
        <button className="remove-btn" onClick={onRemove}>
          x
        </button>
      ) : null}
      <ModalContainer>
        <ServiceReady />
      </ModalContainer>
    </DietItemStyle>
  );
};

export default DietItem;
