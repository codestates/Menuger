import { useState } from 'react';

import Dropdown from '../components/common/Dropdown';

const useDropdown = (menus, curMenuIdx, callback) => {
  const [isVisible, setIsVisible] = useState(false);
  const [idx, setIdx] = useState(curMenuIdx);

  const showDropdown = () => setIsVisible(true);
  const hideDropdown = () => setIsVisible(false);

  const DropdownContainer = () => (
    <>
      {isVisible && (
        <Dropdown
          menus={menus}
          hideDropdown={hideDropdown}
          idx={idx}
          setIdx={setIdx}
          callback={callback}
        />
      )}
    </>
  );

  return { showDropdown, hideDropdown, DropdownContainer, idx };
};

export default useDropdown;
