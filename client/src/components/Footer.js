import React from 'react';
import styled from 'styled-components';

import svgToComponent from '../utils/svg';

const ImgContainer = styled.div``;

const Ptag = styled.p`
  font-weight: bolder;
`;

const AboutUs = styled.div`
  display: flex;
  flex-direction: column;
`;
const Contact = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterCantainer = styled.div`
  display: flex;
  width: 100%;
  > * {
    flex: 1 1 auto;
  }
  a {
    text-decoration: none;
    color: black;
    font-weight: 5;
    padding-bottom: 7px;
  }
  ${Ptag} {
    margin-bottom: 30px;
  }
  @media screen and (max-width: 768px) {
    ${Ptag}, a {
      font-size: 15px;
    }
  }
`;

const Footer = () => {
  return (
    <FooterCantainer>
      <ImgContainer>
        {svgToComponent({ svgName: 'logoYellow', props: { width: '100px', height: '80px' } })}
      </ImgContainer>
      <AboutUs>
        <Ptag>About Us</Ptag>
        <a href="https://github.com/codestates/Menuger/wiki">WIKI</a>
        <a href="https://github.com/codestates/Menuger">Repository</a>
      </AboutUs>
      <Contact>
        <Ptag>Contact</Ptag>
        <a href="https://github.com/Soujiro-a">Back-end 김경윤</a>
        <a href="https://github.com/minbyoungdae">Front-end 민병대</a>
        <a href="https://github.com/jihunv8">Front-end 박지훈</a>
        <a href="https://github.com/jch422">Front-end 정지찬</a>
      </Contact>
    </FooterCantainer>
  );
};

export default Footer;
