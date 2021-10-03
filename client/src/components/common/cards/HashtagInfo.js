import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.8rem;
`;

const Hashtag = styled.div`
  color: #9e9eaa;
  font-size: 0.8rem;
  @media (max-width: 1200px) {
    font-size: 1rem;
  }
  @media (max-width: 900px) {
    font-size: 1.2rem;
  }
  @media (max-width: 768px) {
    font-size: 4vw;
  }
`;

const HashtagInfo = ({ hashtags }) => {
  return (
    <Wrapper>
      {hashtags.map((hashtag, idx) => (
        <Hashtag key={idx}>#{hashtag}</Hashtag>
      ))}
    </Wrapper>
  );
};

export default HashtagInfo;
