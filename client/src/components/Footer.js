import React from 'react';
import styled from 'styled-components';

import logoImageYellow from '../utils/logoImage/logoImageYellow.png';
import logTextOneLine from '../utils/logoImage/logTextOneLine.png';

const ImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  > :nth-child(1) {
    width: 50px;
    height: 50px;
    margin-right: 5px;
  }
  > :nth-child(2) {
    height: 30px;
    margin-top: 10px;
  }
`;

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
  > :nth-child(2) {
    padding-bottom: 10px;
  }
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
    margin-bottom: 15px;
  }
  @media screen and (max-width: 768px) {
    ${Ptag}, a {
      font-size: 0.5em;
    }
    ${Contact} {
      > div {
        padding-bottom: 0px;
      }
    }
    ${ImgContainer} {
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      > :nth-child(1) {
        width: 30px;
        height: 30px;
        margin-right: 5px;
      }
      > :nth-child(2) {
        height: 11px;
        margin-top: 10px;
      }
    }
  }
`;

const Footer = () => {
  return (
    <FooterCantainer>
      <ImgContainer>
        <img src={logoImageYellow}></img>
        <img src={logTextOneLine}></img>
      </ImgContainer>
      <AboutUs>
        <Ptag>About Us</Ptag>
        <a href="https://github.com/codestates/Menuger/wiki">WIKI</a>
        <a href="https://github.com/codestates/Menuger">Repository</a>
      </AboutUs>
      <Contact>
        <Ptag>Contact</Ptag>
        <div>
          <a href="https://github.com/Soujiro-a">
            <span style={{ color: '#9be998' }}>BE </span>
            <span>김경윤</span>
          </a>
          <a href="https://github.com/Soujiro-a" style={{ paddingLeft: '10px' }}>
            <span style={{ color: '#9be998' }}>FE </span>
            <span>민병대</span>
          </a>
        </div>
        <div>
          <a href="https://github.com/Soujiro-a">
            <span style={{ color: '#9be998' }}>FE </span>
            <span>박지훈</span>
          </a>
          <a href="https://github.com/Soujiro-a" style={{ paddingLeft: '10px' }}>
            <span style={{ color: '#9be998' }}>FE </span>
            <span>정지찬</span>
          </a>
        </div>
      </Contact>
    </FooterCantainer>
  );
};

export default Footer;
