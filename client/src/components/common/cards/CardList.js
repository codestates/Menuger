import styled from 'styled-components';

import CardItem from './CardItem';

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

const CardList = ({ cards }) => {
  return (
    <Wrapper>
      <CardListContainer>
        {cards.map(card => (
          <CardItem
            key={card.postId}
            postId={card.postId}
            postType={card.postType}
            title={card.title}
            subscribed={card.subscribed}
            img={card.img}
            imgFileName={card.imgFileName}
            userInfo={card.userInfo}
            postInfo={card.postInfo}
            tagInfo={card.tagInfo}
          />
        ))}
      </CardListContainer>
    </Wrapper>
  );
};

export default CardList;
