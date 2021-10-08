import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    0% {
      transform: rotateX(0deg);
    }
    25% {
      transform: rotateX(-690deg);
    }
    50% {
      transform: rotateX(-1380deg);
    }
    70% {
      transform: rotateX(-1420deg);
    }
    90% {
      transform: rotateX(-1435deg);
    }
    100% {
      transform: rotateX(-1400deg);
    }
  `;

const Div = styled.div`
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    right: 0px;
    top: 40%;
    padding-left: 0px;
  }

  .wrap {
    position: relative;
    margin-top: 200px;
    width: 200px;
    height: 50px;
    overflow: hidden;
    /* background-color: rgba(0, 0, 0, 0.05); */
    border-radius: 5px;
    /* border: 1px solid black; */
    margin: 50px auto 0;

    &.view {
      overflow: visible;
      .list {
        transform: rotateY(45deg);
      }
    }
  }
  .list {
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    margin: 0;
    animation-duration: 1.5s;
    animation-timing-function: linear;
    transform-style: preserve-3d;
    transform-origin: 50% 100%;
    animation-iteration-count: 1;
    animation-fill-mode: both;

    &.rolling {
      animation-name: ${rotate};
    }
  }
  .item {
    position: absolute;
    left: 0;
    top: 0;
    list-style: none;
    height: 50px;
    width: 100px;
    background-color: white;
    transform-origin: 50% 50%;
  }

  .item {
    &:nth-child(1) {
      transform: rotateX(0) translateZ(75px);
    }
    &:nth-child(2) {
      transform: rotateX(36deg) translateZ(75px);
    }
    &:nth-child(3) {
      transform: rotateX(72deg) translateZ(75px);
    }
    &:nth-child(4) {
      transform: rotateX(108deg) translateZ(75px);
    }
    &:nth-child(5) {
      transform: rotateX(144deg) translateZ(75px);
    }
    &:nth-child(6) {
      transform: rotateX(180deg) translateZ(75px);
    }
    &:nth-child(7) {
      transform: rotateX(216deg) translateZ(75px);
    }
    &:nth-child(8) {
      transform: rotateX(252deg) translateZ(75px);
    }
    &:nth-child(9) {
      transform: rotateX(288deg) translateZ(75px);
    }
    &:nth-child(10) {
      transform: rotateX(324deg) translateZ(75px);
    }
  }

  .imoji {
    display: block;
    font-size: 30px;
    line-height: 50px;
    text-align: center;
  }

  .food {
    display: block;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
  }

  .title {
    margin: 0;
    padding-left: 100px;
    font-size: 16px;
    line-height: 50px;
    background-color: transparent;
    text-align: start;
  }

  .btn_wrap {
    margin: 10px auto;
    width: 200px;
  }
`;

const SlotMachine = ({ rollingProps }) => {
  const [number, setNumber] = useState(0);
  const [rolling, setRolling] = useState(' rolling');

  useEffect(() => {
    handleRolling();
  }, []);

  useEffect(() => {
    handleRolling();
  }, [rollingProps]);

  const handleRolling = () => {
    const list = {
      0: '갈비찜',
      1: '김치찜',
      2: '김치찌개',
      3: '부추전',
      4: '된장찌개',
      5: '마라탕',
      6: '간장새우',
      7: '찜닭',
      8: '크림파스타',
      9: '당근케이크',
    };
    let randomNumber = Math.floor(Math.random() * 10);
    setNumber(list[randomNumber]);

    setRolling('');
    setTimeout(() => {
      setRolling(' rolling');
    }, 10);
  };

  return (
    <Div number={number}>
      <div className="wrap">
        <ul className={'list' + rolling}>
          <li className="item">
            <span className="imoji">🍕</span>
          </li>
          <li className="item">
            <span className="imoji">🍖</span>
          </li>
          <li className="item">
            <span className="imoji">🍣</span>
          </li>
          <li className="item">
            <span className="imoji">🍔</span>
          </li>
          <li className="item">
            <span className="imoji">🍝</span>
          </li>
          <li className="item">
            <span className="imoji">🌮</span>
          </li>
          <li className="item">
            <span className="imoji">🍩</span>
          </li>
          <li className="item">
            <span className="imoji">🥟</span>
          </li>
          <li className="item">
            <span className="imoji">🥯</span>
          </li>
          <li className="item">
            <span className="food">{number}</span>
          </li>
        </ul>
        <h1 className="title">만들어볼까?</h1>
      </div>
    </Div>
  );
};

export default SlotMachine;
