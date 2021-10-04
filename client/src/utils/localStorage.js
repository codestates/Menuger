export const saveState = state => {
  try {
    localStorage.setItem('appState', JSON.stringify(state));
  } catch (err) {
    console.log(err);
  }
};

export const loadState = () => {
  try {
    const appState = localStorage.getItem('appState');
    if (appState) {
      return JSON.parse(appState);
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};
