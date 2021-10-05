import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import rootReducer from './modules';
import { saveState, loadState } from './utils/localStorage';
import setBodyTheme from './utils/darkmode';

const loadedState = loadState();

const store = createStore(
  rootReducer,
  loadedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

store.subscribe(() => {
  saveState({
    user: store.getState().user,
    post: store.getState().post,
    theme: store.getState().theme,
  });
  setBodyTheme(store.getState().theme.isDarkMode);
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
