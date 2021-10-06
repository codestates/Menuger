import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset};

    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');
    html {
        font-family: 'Noto Sans','Noto Sans KR', sans-serif;
    }

    textarea {
        font-family: inherit;
        font-size: inherit;
    }
    
    * {
        box-sizing: border-box;
        
    };

    *::-webkit-scrollbar {
        width: 3px;
        height: 3px;
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
