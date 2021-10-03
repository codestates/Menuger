import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset};

    * {
        box-sizing: border-box;
    };

    *::-webkit-scrollbar {
        width: 10px;
    }

    *::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }

    *::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 5px;
    }

    *::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }
`;

export default GlobalStyle;
