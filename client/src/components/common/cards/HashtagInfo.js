import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: auto;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 0.5rem 15%;
  border-top: 1px solid #e4e4e4;
`;

const Hashtag = styled.div`
  color: #4a90e2;
  font-size: 0.7rem;
  @media (max-width: 1200px) {
    font-size: 0.9rem;
  }
  @media (max-width: 900px) {
    font-size: 1.1rem;
  }
  @media (max-width: 768px) {
    font-size: 3.6vw;
  }
  &:hover {
    cursor: pointer;
  }
`;

const HashtagInfo = ({ hashtags }) => {
  return (
    <>
      {!!hashtags.length && (
        <Wrapper>
          {hashtags.map((hashtag, idx) => (
            <Hashtag key={idx}>#{hashtag}</Hashtag>
          ))}
        </Wrapper>
      )}
    </>
  );
};

export default HashtagInfo;
