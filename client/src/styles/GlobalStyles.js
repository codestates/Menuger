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
        background: #e4e4e4;
        border-radius: 5px; 
    }

    *::-webkit-scrollbar-thumb {
        background: #9f9f9f;
        border-radius: 5px;
    }

    *::-webkit-scrollbar-thumb:hover {
        background: #888888;
    }
`;

export default GlobalStyle;
