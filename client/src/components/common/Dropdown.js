import styled from 'styled-components';

import useKeyPress from '../../hooks/useKeyPress';

const OverlayStack = styled.div``;

const Overlay = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: transparent;
  z-index: 7;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 2rem;
  z-index: 8;
  border: 1px solid #ccc;
  border-color: rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 10px rgb(0 0 0 / 20%);
  border-radius: 5px;
  background-color: white;
`;

const DropdownMenu = styled.div`
  cursor: pointer;
  padding: 1rem 2rem;
  color: #3c4043;
  &:hover {
    background-color: ${({ active }) => !active && '#f7f8f8'};
  }
  background-color: ${({ active }) => active && '#e5e5e5'};
  &:first-of-type {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  &:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

const Dropdown = ({ menus, hideDropdown, idx, setIdx }) => {
  useKeyPress('Escape', hideDropdown);

  const handleMenuClick = idx => {
    setIdx(idx);
    hideDropdown();
  };

  return (
    <>
      <OverlayStack>
        <Overlay onClick={hideDropdown} />
      </OverlayStack>
      <Wrapper>
        {menus.map((menu, menuIdx) => (
          <DropdownMenu
            key={menuIdx}
            active={menuIdx === idx}
            onClick={() => handleMenuClick(menuIdx)}
          >
            {menu}
          </DropdownMenu>
        ))}
      </Wrapper>
    </>
  );
};

export default Dropdown;