import GlobalStyle from './styles/GlobalStyles';
import useToastRef from './hooks/toast/useToastRef';
import ToastPortal from './components/common/ToastPortal/ToastPortal';

const App = () => {
  const toastRef = useToastRef();

  return (
    <>
      <GlobalStyle />
      <ToastPortal ref={toastRef} />
    </>
  );
};

export default App;
