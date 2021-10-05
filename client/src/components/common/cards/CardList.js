import { forwardRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import CardItem from './CardItem';
import svgToComponent from '../../../utils/svg';
import scrollToTop from '../../../utils/scroll';
import { HiOutlineArrowCircleUp } from 'react-icons/hi';

const Wrapper = styled.div`
  overflow-x: hidden;
`;

const CardListContainer = styled.ul`
  padding: 1rem 1.5rem;
  @media screen and (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -1rem;
  }
`;

const ScrollEnd = styled.div`
  display: flex;
  justify-content: center;
  height: 0px;
`;

const ScrollToTop = styled.div`
  position: fixed;
  z-index: 7;
  right: 10px;
  bottom: 10px;
  font-size: 50px;
  color: #ffc436;
  :hover {
    color: #fc9f77;
    cursor: pointer;
  }
`;

const EmptyDiv = styled.div`
  height: 70px;
`;

const CardList = forwardRef(({ cards, hasNext, handleCardClick }, fetchMoreRef) => {
  const { isDarkMode } = useSelector(state => state.theme);
  const arrowDownConfig = {
    svgName: 'arrowDown',
    props: { width: 200, fill: isDarkMode ? 'white' : 'black' },
  };

  return (
    <>
      <Wrapper isDark={isDarkMode}>
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
              updatedAt={card.updatedAt}
              handleCardClick={handleCardClick}
            />
          ))}
        </CardListContainer>
      </Wrapper>
      {hasNext && (
        <ScrollEnd ref={fetchMoreRef}>
          {cards.length > 0 && svgToComponent(arrowDownConfig)}
        </ScrollEnd>
      )}
      {!hasNext && <EmptyDiv />}
      <ScrollToTop onClick={scrollToTop}>
        <HiOutlineArrowCircleUp />
      </ScrollToTop>
    </>
  );
});

export default CardList;
