import { useState } from 'react';

import Dropdown from '../components/common/Dropdown';

const useDropdown = menus => {
  const [isVisible, setIsVisible] = useState(false);
  const [idx, setIdx] = useState(0);

  const showDropdown = () => setIsVisible(true);
  const hideDropdown = () => setIsVisible(false);

  const DropdownContainer = () => (
    <>
      {isVisible && (
        <Dropdown menus={menus} hideDropdown={hideDropdown} idx={idx} setIdx={setIdx} />
      )}
    </>
  );

  return { showDropdown, hideDropdown, DropdownContainer, idx };
};

export default useDropdown;
