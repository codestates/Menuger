import { forwardRef } from 'react';
import styled from 'styled-components';

import CardItem from './CardItem';
import svgToComponent from '../../../utils/svg';
import scrollToTop from '../../../utils/scroll';
import { HiOutlineArrowCircleUp } from 'react-icons/hi';

const Wrapper = styled.div`
  overflow-x: hidden;
`;

const CardListContainer = styled.ul`
  @media screen and (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -1rem;
  }
`;

const ScrollEnd = styled.div`
  display: flex;
  justify-content: center;
  height: 70px;
`;

const ScrollToTop = styled.div`
  position: fixed;
  z-index: 200;
  right: 10px;
  bottom: 10px;
  font-size: 50px;
  color: #ffc436;
  :hover {
    color: #fc9f77;
    cursor: pointer;
  }
`;

const CardList = forwardRef(({ cards, hasNext }, fetchMoreRef) => {
  const arrowDownConfig = { svgName: 'arrowDown', props: { width: 200 } };
  const arrowUpConfig = { svgName: 'arrowUp', props: { onClick: scrollToTop, cursor: 'pointer' } };

  return (
    <>
      <Wrapper>
        <CardListContainer>
          {cards.map(card => (
            <CardItem
              key={card._id}
              postId={card._id}
              postType="recipe"
              title={card.title}
              thumbnail_url={card.thumbnail_url}
              originalFileName={card.originalFileName}
              user={card.user}
              commentsCount={card.commentsCount}
              likesCount={card.likesCount}
              bookmarksCount={card.bookmarksCount}
              hashtags={card.hashtags}
            />
          ))}
        </CardListContainer>
      </Wrapper>
      <ScrollEnd ref={fetchMoreRef}>
        {hasNext && cards.length > 0 && svgToComponent(arrowDownConfig)}
        {/*!hasNext && svgToComponent(arrowUpConfig)} */}
        <ScrollToTop onClick={scrollToTop}>
          <HiOutlineArrowCircleUp />
        </ScrollToTop>
      </ScrollEnd>
    </>
  );
});

export default CardList;
