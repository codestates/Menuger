import GlobalStyle from './styles/GlobalStyles';

import Header from './components/header/Header.js';
import useToastRef from './hooks/toast/useToastRef';
import ToastPortal from './components/common/ToastPortal/ToastPortal';

const App = () => {
  const toastRef = useToastRef();

  return (
    <>
      <GlobalStyle />
      <Header />
      <ToastPortal ref={toastRef} />
    </>
  );
};

export default App;
