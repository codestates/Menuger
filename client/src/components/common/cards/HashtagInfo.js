import React from 'react';
import styled from 'styled-components';
import { createBrowserHistory } from 'history';

const Hashtag = styled.div`
  display: inline-block;
  color: ${({ color }) => color || '#4a90e2'};
  font-size: ${({ fs }) => fs || '0.7rem'};
  margin-right: 0.6em;
  margin-bottom: 0.3em;

  @media (max-width: 1200px) {
    font-size: ${({ fs1200 }) => fs1200 || '0.9rem'};
  }
  @media (max-width: 900px) {
    font-size: ${({ fs900 }) => fs900 || '1.1rem'};
  }
  @media (max-width: 768px) {
    font-size: ${({ fs768 }) => fs768 || '3.6vw'};
  }
  &:hover {
    cursor: pointer;
  }
`;

const HashtagInfo = ({ postType, hashtags, style = {} }) => {
  const { fs, fs1200, fs900, fs768, color } = style;
  const history = createBrowserHistory({ forceRefresh: true });

  const handleHashtagClick = hashtag => {
    localStorage.setItem('searched', `#${hashtag}`);
    history.push({
      pathname: `/${postType}`,
      search: '?sort=dd',
      state: { input: `#${hashtag}` },
    });
  };

  return (
    <>
      {!!hashtags.length && (
        <>
          {hashtags.map((hashtag, idx) => (
            <Hashtag
              key={idx}
              fs={fs}
              fs1200={fs1200}
              fs900={fs900}
              fs768={fs768}
              color={color}
              onClick={() => {
                handleHashtagClick(hashtag);
              }}
            >
              #{hashtag}
            </Hashtag>
          ))}
        </>
      )}
    </>
  );
};

export default HashtagInfo;
