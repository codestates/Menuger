const setBodyTheme = isDarkMode => {
  if (isDarkMode) {
    document.body.style.backgroundColor = '#1F2023';
  } else {
    document.body.style.backgroundColor = 'white';
  }
};

export default setBodyTheme;
