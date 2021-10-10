const setBodyTheme = isDarkMode => {
  if (isDarkMode) {
    document.body.style.backgroundColor = '#202225';
  } else {
    document.body.style.backgroundColor = 'white';
  }
};

export default setBodyTheme;
